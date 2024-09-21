// import { useState } from "react";
// import TaskForm from "../component/TaskForm";
// import TaskList from "../component/TaskList";

// const Home = () => {
//   const [tasks, setTasks] = useState([]);

//   const addTask = (newTask) => setTasks([...tasks, newTask]);
//   const updateTask = (index, updatedTask) => {
//     const newTasks = [...tasks];
//     newTasks[index] = updatedTask;
//     setTasks(newTasks);
//   };

//   const deleteTask = (index) => {
//     const newTasks = tasks.filter((task, i) => i !== index);
//     setTasks(newTasks);
//   };

//   return (
//     <div>
//       <h3 className="text-center text-primary">Note Your Task </h3>
//       <TaskForm addTask={addTask} />
//       <TaskList
//         tasks={tasks}
//         setTasks={setTasks}
//         updateTask={updateTask}
//         deleteTask={deleteTask}
//       />
//     </div>
//   );
// };

// export default Home;

import { useState } from "react";
import TaskList from "../component/TaskList";
import TaskForm from "../component/TaskForm";
// import TaskForm from "../components/TaskForm";
// import TaskList from "../components/TaskList";

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
      <h3 className="text-center text-primary">Note Your Task </h3>
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
