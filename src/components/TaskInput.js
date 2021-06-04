import React, {useState} from 'react';

const TaskInput = (props) => {

    let [input, setInput] = useState('')
    let changeInput = (e) => {
        setInput(e.target.value)
    }

    function addTasks() {
        props.addTask(input);
        setInput('')
    }

    function addTask(e) {
        if (e.keyCode === 13) {
            addTasks()
        }
    }

    return (
        <div className="search-box">
            <p>Add</p>
            <input type="text" placeholder=" your new task"
                   onKeyDown={addTask} onChange={changeInput}
                   value={input}
                   className="search-input"/>
            <button onClick={addTasks} className="search-btn">
                <i className="fas fa-search"/>
            </button>
        </div>
    )
}

export default TaskInput;