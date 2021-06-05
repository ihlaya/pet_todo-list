import './App.css';
import './assets/flags.css';
import Tasks from "./components/Tasks";
import TaskInput from "./components/TaskInput";
import {Pie} from 'react-chartjs-2';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import React from "react";


function App(props) {

    return (
        <div className="App">
            <div className="wrapper">
                <div className='title'>
                    <h2> <p>{props.langData.title} : {props.tasks.length}</p></h2>
                    <div className='diagram'>
                        <Pie data={props.data} options={props.data.options}/>
                    </div>
                    <div className='changeLang'>
                        <span onClick={() => {props.changeLang('ua')}}><i className="flag-UA"/></span>
                        <span onClick={() => {props.changeLang('eng')}}><i className="flag-US"/></span>
                    </div>
                </div>
            <div className='showTasks'>
                <button className='all' onClick={() => {props.show(props.allTask)}}>{props.langData.all}</button>
                <button className='doneTask' onClick={() => {props.show(props.doneTasks)}}>{props.langData.done}</button>
                <button className='active' onClick={() => {props.show(props.activeTasks)}}>{props.langData.active}</button>
                <button className='clear' onClick={() => {props.clear()}}>{props.langData.clear}</button>
            </div>
            <DragDropContext onDragEnd={props.handleOnDragEnd}>
                <Droppable droppableId='tasksContent' >
                    {(provided) => (
                        <div className="tasksContent" {...provided.droppableProps}
                             ref={provided.innerRef}>
                            {props.characters.map((task, index) => (
                                <Draggable key={task.id} draggableId={`${task.id}`} index={index} >
                                    {(provided) => (
                                        <div {...provided.dragHandleProps}
                                             {...provided.draggableProps}
                                             {...provided.droppableProps}
                                             ref={provided.innerRef}>
                                            <Tasks tasks={task} key={task.id}
                                                   doneTask={props.doneToggler}
                                                   deleteTask={props.deleteTask}
                                                   editTask={props.editTask}
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
                <TaskInput addTask={props.addTask} prev={props.langData.prevBtn} placeHolder={props.langData.placeholder}/>
            </div>
            </div>
        </div>
    );
}

export default App;
