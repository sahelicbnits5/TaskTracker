//import logo from './logo.svg';
//import './App.css';
import Tasks from "./components/Tasks";
import Header from "./components/Header";
import { useState } from "react"
import Add from "./components/Add";

const App = () => {
  const[tasks, setTask] = useState(
    [
        {
            id : 1,
            text : 'Appointment-1',
            day : 'Monday',
            reminder: true,
        },
        {
            id : 2,
            text : 'Appointment-2',
            day : 'Tuesday',
            reminder: true,
        },
        {
            id : 3,
            text : 'Appointment-3',
            day : 'Wednesday',
            reminder: false,
        }
    ]
    
)

//Add Task
const addTask = (task) =>
{
console.log(task)
}

//Delete Task
const deleteTask = (id) =>
{
setTask(tasks.filter((task) => task.id !== id))
}

//Toggle reminder
const toggleReminder = (id) =>
{
  setTask(tasks.map((task) => task.id== id? {...task,reminder:!task.reminder}: task))
}
  return (
    <div className='container'>
      <Header />
      <Add onAdd={addTask}/>
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Task to show'}
    </div>
  );
}

export default App;
