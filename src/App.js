//import logo from './logo.svg';
//import './App.css';
import Tasks from "./components/Tasks";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from "./components/Header";
import { useState, useEffect } from "react"
import Add from "./components/Add";
import Footer from "./components/Footer";
//import { wait } from "@testing-library/user-event/dist/utils";
import About from "./components/About";

const App = () => {
  const[showAddTask,setShowAddTask] = useState(false)
  const[tasks, setTask] = useState([])
  useEffect(()=>{
    const getTask = async () => {
      const taskFromServer = await fetchTask() 
      setTask(taskFromServer)
    }
    getTask()
  },[])

  //Fetch Task
  const fetchTask = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTasks = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

//Add Task
const addTask = async (task) =>
{
  const res = await fetch('http://localhost:5000/tasks',{
    method : 'POST',
    headers : {
      'Content-type' : 'application/json'
    },
    body : JSON.stringify(task)
  })
  const data = await res.json()
  setTask([...tasks, data])
/*const id = Math.floor(Math.random()*10000) + 1
const newTask = {id,...task}
setTask([...tasks, newTask])*/
}

//Delete Task
const deleteTask = async (id) =>
{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE',
  })
setTask(tasks.filter((task) => task.id !== id))
}

//Toggle reminder
const toggleReminder = async (id) =>
{
  const taskToToggle = await fetchTasks(id)
  const updTask = {...taskToToggle,reminder: !taskToToggle.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
method : 'PUT',
headers : {
  'Content-type' : 'application/json',
},
body: JSON.stringify(updTask)

  })
  const data = await res.json()

  setTask(tasks.map((task) => task.id== id? 
  {...task,reminder:data.reminder}: task))
}
  return (
    
    <Router>
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} 
      />
      <Routes>
<Route path= '/' element={
  <>
{showAddTask && <Add onAdd={addTask}/>}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('No Task to show')}
  </>
} />
<Route path='/about' element={<About />} />
</Routes>
      <Footer />
    </div>
    </Router>
    
  );
}

export default App;
