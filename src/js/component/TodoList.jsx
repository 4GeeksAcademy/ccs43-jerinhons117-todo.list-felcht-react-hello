import React, { useState } from "react";
import ReactDOM from "react-dom";


const TodoList = () => {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [error, setError] = useState(false)
    const handleTask = (event) => {
        setTask(event.target.value); 
    } 
    const addTask = (event) => {
        if (event.key == "Enter") {

            if (event.target.value == "") {
                setError(true);
                alert("Please add a task!");
                return;
            }
            setTaskList([...taskList, task]);
            setTask("");
            setError(false);
        }
    }
    return (

        <div className="body">
            <div className="container">
                <div className="tittle">
                    <h1 className={`${error ? "text-danger" : "light"}`}>ToDo List</h1>
                </div>
                <div className="card_list">
                <label htmlFor="task" >

                </label>
                <input className={`${error ? "bg-danger" : "light"}`} value={task} onKeyDown={addTask} onChange={handleTask} placeholder="create a task"/>
                    <div>
                        <div>
                        {
                            taskList.length == 0 ? (
                                <p> there is no task to add</p>
                            ):(
                                taskList.map((task, index) => {
                                    return <p key={index} className="list"> {task} {""} <i className="fa-solid fa-x equis" onClick={() => setTaskList(taskList.filter((t, currentIndex ) => index != currentIndex))}></i></p>
                                })
                            )
                        }
                        </div>
                        <div className="number_list">
                            <p>{taskList.length} task</p>
                        </div>

                    </div>
                
                </div>
            </div>

        </div>

    );
};

export default TodoList;
