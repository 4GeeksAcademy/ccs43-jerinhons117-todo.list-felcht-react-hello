import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";


const TodoList = () => {
    
    const API_URL = "https://assets.breatheco.de/apis/fake/todos/user/jerinhons117";
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
            putToDos(task);
            setTask("");
            setError(false);
        }
    }

    /*const resetlist = () => {
        setTaskList("");
        console.log("reseteado");
    }*/

    async function getToDos(){
        try{
            const response = await fetch(API_URL);
            console.log(response)
            if (response.status == 404){
                postToDos()
                return;
            }

            if (response.status != 200){
                console.log("hay un error en el Get")
                return;
            }
            const body = await response.json();
            console.log(body);
            setTaskList(body);

       
        } catch(error){
            console.log(error)
        }
    }
     async function trashToDo(clearTask){
            try{
                const response = await fetch(API_URL, {
                    method: "PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(clearTask) 
                });
                console.log(response)
                if (response.status != 200){
                    console.log("hay un error en el PUT")
                    return;
                }
                const body = await response.json();
                console.log(body);
                getToDos()
                
            }
            catch(error){
                console.log(error)
            }
        };

    async function putToDos(newTask){
        const taskObject ={
            label: newTask,
            done: false
        }
        try{
            const response = await fetch(API_URL, {
                method: "PUT",
                headers: {
					"Content-Type": "application/json"
				},
                body: JSON.stringify([...taskList, taskObject])
          
            });
            console.log(response);
            if (response.status != 200){
                console.log("hay un error en el Get")
                return;
            }
            const body = await response.json();
            console.log(body);
            getToDos();


            
        } 
        catch(error){
            console.log("error")
        }
    }

    async function postToDos(postUser){
        try{
            const response = await fetch(API_URL,{
                method: "POST",
                headers:{
                    "content-type":"application/json"
                },

                body:JSON.stringify([])
            })
            console.log(response);
            if(response.status !=200){
                console.log("hay un error en el POST")
                return;
            }
            getToDos()
            
        } 
        
        catch(error){
            console.log(error);
        }

    }


    async function deleteToDos(deleteTask){
        try{
            const response = await fetch(API_URL,{
                method:"DELETE",
                headers:{
                    "content-type":"application/json"
                },
            });
            console.log(response)
            if (response.status !=200){
                console.log("hay un error en el DELETE")
                return;
            }
            postToDos();

        } catch(error){
            console.log(error)

        }
    }

    useEffect(() => {
        console.log("inicia la aplicacion") 
        getToDos()
        
    },[])

    
    return (

        <div className="body">
            <div className="container">
                <div className="tittle">
                    <h1 className={`${error ? "text-danger" : "light"}`}>ToDo List</h1>
                </div>
                <div className="card_list">
                
                <input className={`${error ? "bg-danger" : "light"}`} value={task} onKeyDown={addTask} onChange={handleTask} placeholder="create a task"/>
                    <div>
                        <div>
                        {
                            taskList.length == 0 ? (
                                <p> there is no task to add</p>
                            ):(
                                taskList.map((task, index) => {
                                    return (
                                        <p 
                                            key={index} 
                                            className="list"
                                        > 
                                            {task.label} {""} 
                                            <i 
                                                className="fa-solid fa-x equis" 
                                                onClick={() =>{
                                                    const newToDo = taskList.filter((t, currentIndex ) => index != currentIndex)
                                                    if (newToDo.length == 0){
                                                        deleteToDos()
                                                        return;
                                                        
                                                    }
                                                    
                                                    trashToDo(newToDo);
                                                }}
                                            ></i>
                                        </p>)
                                })
                                
                            )
                            
                        }
                        </div>
                        <div className="number_list">
                            <p>{taskList.length} task</p>
                        </div>
                    <button className="boton" onClick={deleteToDos}
                    >
                        refresh
                    </button>

                    </div>
                
                </div>
            </div>

        </div>

    );
};

export default TodoList;
