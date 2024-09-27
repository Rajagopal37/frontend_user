import { useState } from "react";
import TaskList from "../component/TaskList";
import TaskForm from "../component/TaskForm";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => setTasks([...tasks, newTask]);
  const updateTask = (index, updatedTask) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default Home;
