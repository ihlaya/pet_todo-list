import React, { useState} from 'react';


const Tasks = ({tasks, deleteTask, editTask, ...props}) => {
    const [editMode, setEditMode] = useState(false)
    const [task, newTask] = useState(tasks.title)
    let modeToggler = () => {
        setEditMode(!editMode)
        editTask(tasks.id, task)
    }
    let changeTask = (e) => {
        newTask(e.currentTarget.value)
    }
    let handleSelect = (e) => {
        e.target.select();
    };

    return (
        <div className={!tasks.done ? 'tasksList' : 'tasksList complete'}>
            <div className='taskItem' onClick={() => {
                props.doneTask(tasks.id)
            }}>
                {tasks.done ? <span className="material-icons done">task_alt</span>
                    : <span className="material-icons notDone">radio_button_unchecked</span>
                }
                {!editMode ? <p className='tasksTitle'>{task}</p>
                    : <input className='input' type="text" value={task}
                             autoFocus={true}
                             onChange={changeTask}
                             onFocus={handleSelect}
                             onBlur={modeToggler}
                    />
                }

            </div>
            <span onClick={() => {
                modeToggler()
            }} className="material-icons edit">mode</span>
            <span onClick={() => {
                deleteTask(tasks.id)
            }} className="material-icons deleteTask">delete_forever</span>
        </div>
    )
}

export default Tasks;