import { useState, useEffect } from "react";
import axios from "axios";

const TaskList = ({ tasks, setTasks, updateTask, deleteTask }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState({
    name: "",
    description: "",
    status: "Not Completed",
    assignDate: "",
    lastDate: "",
  });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.get(
          "https://gopaltaskmanager.netlify.app/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [setTasks]);

  const handleEditClick = (index, task) => {
    setEditIndex(index);
    setEditedTask(task);
  };

  const handleSaveClick = async (index) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.put(
        `https://backend-url.com/api/tasks/${tasks[index]._id}`,
        editedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      updateTask(index, response.data);
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteClick = async (index) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      await axios.delete(
        `https://backend-url.com/api/tasks/${tasks[index]._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      deleteTask(index);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Filter Tasks Based on Status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.status === "Completed";
    if (filter === "Not Completed") return task.status === "Not Completed";
    return true; // Return all tasks for "All" filter
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-3">
        <div>
          <h3 className="text-primary mb-0">Task Lists</h3>
        </div>

        <div className="text-primary ">
          <label className="fs-5">Status Filter: </label>
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="ms-1"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Incomplete</option>
          </select>
        </div>
      </div>

      {/* Displaying Tasks */}
      <div className="row">
        {filteredTasks.map((task, index) => (
          <div className="col-md-3" key={index}>
            <div className="card mb-3">
              <div className="card-body">
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      className="form-control mb-2"
                      value={editedTask.name}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, name: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      name="description"
                      className="form-control mb-2"
                      value={editedTask.description}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          description: e.target.value,
                        })
                      }
                    />
                    <select
                      name="status"
                      className="form-control mb-2"
                      value={editedTask.status}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, status: e.target.value })
                      }
                    >
                      <option value="Completed">Completed</option>
                      <option value="Not Completed">Incomplete</option>
                    </select>
                    <input
                      type="date"
                      name="assignDate"
                      className="form-control mb-2"
                      value={editedTask.assignDate.split("T")[0]}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          assignDate: e.target.value,
                        })
                      }
                    />
                    <input
                      type="date"
                      name="lastDate"
                      className="form-control mb-2"
                      value={editedTask.lastDate.split("T")[0]}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          lastDate: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{task.name}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">
                      Assign Date:{" "}
                      {new Date(task.assignDate).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                      Last Date: {new Date(task.lastDate).toLocaleDateString()}
                    </p>
                    <p className="card-text text-center fs-5">
                      <span
                        className={`badge ${
                          task.status === "Completed"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {task.status}
                      </span>
                    </p>
                  </>
                )}

                <div className="d-flex justify-content-evenly">
                  {editIndex === index ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleSaveClick(index)}
                    >
                      <i className="bi bi-check-square"></i>
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(index, task)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(index)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

// import { useState, useEffect } from "react";
// import axios from "axios";

// const TaskList = ({ tasks, setTasks, updateTask, deleteTask }) => {
//   const [editIndex, setEditIndex] = useState(null);
//   const [editedTask, setEditedTask] = useState({
//     name: "",
//     description: "",
//     status: "Not Completed",
//     assignDate: "",
//     lastDate: "",
//   });

//   const [filter, setFilter] = useState("All"); // Track the status filter

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(
//           "https://backend-srni.onrender.com/api/tasks"
//         );
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };
//     fetchTasks();
//   }, [setTasks]);

//   const handleEditClick = (index, task) => {
//     setEditIndex(index);
//     setEditedTask(task);
//   };

//   const handleSaveClick = async (index) => {
//     try {
//       const response = await axios.put(
//         `https://backend-srni.onrender.com/api/tasks/${tasks[index]._id}`,
//         editedTask
//       );
//       updateTask(index, response.data);
//       setEditIndex(null);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const handleDeleteClick = async (index) => {
//     try {
//       await axios.delete(
//         `https://backend-srni.onrender.com/api/tasks/${tasks[index]._id}`
//       );
//       deleteTask(index);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedTask({ ...editedTask, [name]: value });
//   };

//   // Calculate task counts
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter(
//     (task) => task.status === "Completed"
//   ).length;
//   const incompleteTasks = tasks.filter(
//     (task) => task.status === "Not Completed"
//   ).length;

//   // Filter Tasks Based on Status
//   const filteredTasks = tasks.filter((task) => {
//     if (filter === "Completed") return task.status === "Completed";
//     if (filter === "Not Completed") return task.status === "Not Completed";
//     return true; // Return all tasks for "All" filter
//   });

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center my-3">
//         <div>
//           <h3 className="text-primary mb-0">Task Lists</h3>
//         </div>

//         {/* Status Filter */}
//         <div className="text-primary ">
//           <label className="fs-5">Status Filter: </label>
//           <select
//             onChange={(e) => setFilter(e.target.value)}
//             value={filter}
//             className="ms-1"
//           >
//             <option value="All">All</option>
//             <option value="Completed">Completed</option>
//             <option value="Not Completed">Incomplete</option>
//           </select>
//         </div>

//         {/* Task Counts */}
//         <div className="d-flex align-items-center">
//           <span className="bg-primary text-white fw-bold  px-3 py-2 mx-1 rounded-circle ">
//             {totalTasks}
//           </span>
//           <span className="bg-success text-white fw-bold   px-3 py-2 mx-1 rounded-circle">
//             {completedTasks}
//           </span>
//           <span className="bg-danger text-white fw-bold  px-3 py-2 mx-1 rounded-circle">
//             {incompleteTasks}
//           </span>
//         </div>
//       </div>

//       {/* Displaying Tasks */}
//       <div className="row">
//         {filteredTasks.map((task, index) => (
//           <div className="col-md-3" key={index}>
//             <div className="card mb-3">
//               <div className="card-body">
//                 {editIndex === index ? (
//                   <>
//                     <input
//                       type="text"
//                       name="name"
//                       className="form-control mb-2"
//                       value={editedTask.name}
//                       onChange={handleInputChange}
//                     />
//                     <input
//                       type="text"
//                       name="description"
//                       className="form-control mb-2"
//                       value={editedTask.description}
//                       onChange={handleInputChange}
//                     />
//                     <select
//                       name="status"
//                       className="form-control mb-2"
//                       value={editedTask.status}
//                       onChange={handleInputChange}
//                     >
//                       <option value="Completed">Completed</option>
//                       <option value="Not Completed">Incomplete</option>
//                     </select>

//                     <input
//                       type="date"
//                       name="assignDate"
//                       className="form-control mb-2"
//                       value={editedTask.assignDate.split("T")[0]}
//                       onChange={handleInputChange}
//                     />
//                     <input
//                       type="date"
//                       name="lastDate"
//                       className="form-control mb-2"
//                       value={editedTask.lastDate.split("T")[0]}
//                       onChange={handleInputChange}
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <h5 className="card-title">{task.name}</h5>
//                     <p className="card-text">{task.description}</p>

//                     <p className="card-text">
//                       Assign Date:{" "}
//                       {new Date(task.assignDate).toLocaleDateString()}
//                     </p>
//                     <p className="card-text">
//                       Last Date: {new Date(task.lastDate).toLocaleDateString()}
//                     </p>

//                     <p className="card-text text-center fs-5">
//                       {/* Status:{" "} */}
//                       <span
//                         className={`badge ${
//                           task.status === "Completed"
//                             ? "bg-success"
//                             : "bg-danger"
//                         }`}
//                       >
//                         {task.status}
//                       </span>
//                     </p>

//                     <p className="card-text text-center fw-bold">
//                       Remaining Days:{" "}
//                       {Math.ceil(
//                         (new Date(task.lastDate) - new Date()) /
//                           (1000 * 60 * 60 * 24)
//                       )}
//                     </p>
//                   </>
//                 )}

//                 <div className="d-flex justify-content-evenly">
//                   {editIndex === index ? (
//                     <button
//                       className="btn btn-success"
//                       onClick={() => handleSaveClick(index)}
//                     >
//                       <i className="bi bi-check-square"></i>
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => handleEditClick(index, task)}
//                     >
//                       <i className="bi bi-pencil-square"></i>
//                     </button>
//                   )}
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleDeleteClick(index)}
//                   >
//                     <i className="bi bi-trash3"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskList;
