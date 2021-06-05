import React, {useState} from 'react';

const TaskInput = (props) => {

    let [input, setInput] = useState('')
    let changeInput = (e) => {
        setInput(e.target.value)
    }

    function addTasks() {
        document.getElementById("myText").focus();
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
            <p>{props.prev}</p>
            <input type="text" placeholder={props.placeHolder}
                   onKeyDown={addTask} onChange={changeInput}
                   autoFocus={true}
                   id='myText'
                   value={input}
                   className="search-input"/>
            <button onClick={addTasks}  className="search-btn">
            </button>
        </div>
    )
}

export default TaskInput;