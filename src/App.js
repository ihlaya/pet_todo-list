import './App.css';
import React, {useEffect, useState} from "react";
import Tasks from "./components/Tasks";
import TaskInput from "./components/TaskInput";
import {Pie} from 'react-chartjs-2';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'


function App() {
    let [allTask, setAllTasks] = useState([])
    let [tasks, setTasks] = useState([]);
    let [characters, updateCharacters] = useState([]);

    let doneTasks = allTask.filter(task => task.done);
    let activeTasks = allTask.filter(task => !task.done);


    let setter = (value) => {
        value.sort(function(a,b){return a.done-b.done});
        setTasks(value);
        setAllTasks(value);
        updateCharacters(value);
    }
    let show = (status) => {
        updateCharacters(status)
    }
    let addTask = (value) => {
        if (value !== '') {
            let newTasks = [{
                id: Date.now(),
                title: value,
                done: false,
            }, ...tasks];
            localStorage.setItem('todo', JSON.stringify(newTasks))
            setter(newTasks)
        }
    }
    let changeTask = (id, switcher, value) => {
        let newTasks = [...tasks]
        newTasks.forEach(function (item) {
            if (item.id === id) {
                switch (switcher) {
                    case 'done':
                        return item.done = !item.done;
                    case 'title':
                        return item.title = value
                    case 'delete':
                        const index = newTasks.map(function(e) { return e.id; }).indexOf(id);
                        return newTasks.splice(index, 1);
                    default:
                        return null
                }
            }
        })
        localStorage.setItem('todo', JSON.stringify(newTasks));
        setter([...newTasks]);
    }
    let doneToggler = (id) => {
        changeTask(id, 'done')
    }
    let deleteTask = (id) => {
        changeTask(id, 'delete')
    }
    let clear = () => {
        setter([])
        localStorage.clear()
    }
    let editTask = (id, value) => {
        changeTask(id, 'title', value);
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);
    }

    const data = {
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            }
        },
        labels: ['Active', 'Done',],
        datasets: [
            {
                data: [activeTasks.length, doneTasks.length],
                backgroundColor: [
                    'black',
                    'white',

                ],
                borderColor: [
                    'black',
                    'white',
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        document.querySelector('.App').style.filter = 'blur(0)';
        if (localStorage.getItem('todo')) {
            let newTasks = JSON.parse(localStorage.getItem('todo'));
            setter(newTasks)
        }
    }, [])
    return (
        <div className="App">
            <div className="wrapper">
                <div className='title'>
                    <h2> <p>My ToDo-list : {tasks.length}</p></h2>
                    <div className='diagram'>
                        <Pie data={data} options={data.options}/>
                    </div>
                </div>
            <div className='showTasks'>
                <button className='all' onClick={() => {show(allTask)}}>All</button>
                <button className='doneTask' onClick={() => {show(doneTasks)}}>Done</button>
                <button className='active' onClick={() => {show(activeTasks)}}>Active</button>
                <button className='clear' onClick={() => {clear()}}>Clear</button>
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='tasksContent' >
                    {(provided) => (
                        <div className="tasksContent" {...provided.droppableProps}
                             ref={provided.innerRef}>
                            {characters.map((task, index) => (
                                <Draggable key={task.id} draggableId={`${task.id}`} index={index} >
                                    {(provided) => (
                                        <div {...provided.dragHandleProps}
                                             {...provided.draggableProps}
                                             {...provided.droppableProps}
                                             ref={provided.innerRef}>
                                            <Tasks tasks={task} key={task.id}
                                                   doneTask={doneToggler}
                                                   deleteTask={deleteTask}
                                                   editTask={editTask}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="taskinput">
                <TaskInput addTask={addTask}/>
            </div>
            </div>
        </div>
    );
}

export default App;
