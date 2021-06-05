import './App.css';
import React, {useEffect, useState} from "react";
import App from "./App";


function AppContainer() {
    let [allTask, setAllTasks] = useState([])
    let [tasks, setTasks] = useState([]);
    let [characters, updateCharacters] = useState([]);
    let [lang, setLang] = useState('ua')

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
    let changeLang = (str) => {
        setLang(str)
        console.log('change lang')
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);
    }

    const langData = {
        eng:{
            title: 'My To-do list',
            all: 'All tasks',
            done: 'Done tasks',
            active: 'Active tasks',
            clear : 'Clear list',
            prevBtn: 'Add',
            placeholder: 'your new task'
        },
        ua:{
            title: 'Мій список задач',
            all: 'Всі задачі',
            done: 'Виконані задачі',
            active: 'Активні задачі',
            clear : 'Очистити список',
            prevBtn: 'Додай',
            placeholder: 'cвою нову задачу'
        },
    };

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
        if (localStorage.getItem('todo')) {
            let newTasks = JSON.parse(localStorage.getItem('todo'));
            setter(newTasks)
        }
    }, [])
    return (
        <App allTask={allTask}
             doneToggler={doneToggler}
             deleteTask={deleteTask}
             editTask={editTask}
             doneTasks={doneTasks}
             activeTasks={activeTasks}
             tasks={tasks}
             data={data}
             langData={lang === 'eng' ? langData.eng : langData.ua}
             handleOnDragEnd={handleOnDragEnd}
             show={show}
             changeLang={changeLang}
             clear={clear}
             addTask={addTask}
             characters={characters}/>
    );
}

export default AppContainer;
