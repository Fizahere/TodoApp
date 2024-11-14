import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa6";
import { TiHeartFullOutline } from "react-icons/ti";

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [err, setErr] = useState("");
  const [isFav, setIsFav] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [tab, setTab] = useState("all-tasks");
  const [allTask, setAllTask] = useState([]);

  const toggleTabs = (tabName) => {
    setTab(tabName);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!task || !desc) {
      setErr("Fill the fields first.");
      return;
    }

    if (isEdit) {
      const updatedTasks = allTask.map((t, index) =>
        index === editId ? { ...t, task, desc } : t
      );
      setAllTask(updatedTasks);
      setIsEdit(false);
      setEditId(null);
    } else {
      setAllTask([...allTask, { task, desc, isFav }]);
    }

    setTask("");
    setDesc("");
    setErr("");
  };

  const deleteTaskHandler = (id) => {
    if (confirm("Are you sure?")) {
      setAllTask(allTask.filter((_, index) => index !== id));
    }
  };

  const editTaskHandler = (id) => {
    const taskToEdit = allTask[id];
    setTask(taskToEdit.task);
    setDesc(taskToEdit.desc);
    setIsEdit(true);
    setEditId(id);
  };

  const addTaskToFavHandler = (id) => {
    const updatedTasks = allTask.map((task, index) =>
      index === id ? { ...task, isFav: !task.isFav } : task
    );
    setAllTask(updatedTasks);
  };

  return (
    <>
      <div className="h-screen w-screen">
        <div className="bg-black text-white h-20 flex justify-center items-center">
          Todo App
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center pt-20 lg:px-8">
          <div className="w-1/2 pr-4 md:border-r-2 md:border-black">
            <form onSubmit={onSubmitHandler}>
              <div className="flex flex-col">
                <h1 className="text-2xl py-4">
                  {isEdit ? "Edit Task" : "Add Task"}
                </h1>
                <input
                  className="h-10 w-60 md:w-auto border-2 px-2 border-gray-500 rounded-lg focus:outline-cyan-500"
                  type="text"
                  placeholder="Task**"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
                <input
                  className="h-10 w-60 md:w-auto border-2 px-2 border-gray-500 mt-4 rounded-lg focus:outline-cyan-500"
                  type="text"
                  placeholder="Desc**"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <p className="text-red-400 ml-1 mt-1">{err && err}</p>
                <button
                  className={`px-4 py-2 w-60 md:w-auto text-white mt-4 rounded-lg ${
                    !task || !desc ? "bg-gray-300" : "bg-black"
                  }
                  ${
                    !task || !desc ? "cursor-not-allowed" : "cursor-pointer"
                  }
                  `}
                  disabled={!task || !desc}
                  type="submit"
                >
                  {isEdit ? "Save Changes" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/2">
            <div className="flex justify-center">
              <p
                className={`text-2xl text-center mb-6 mt-4 md:mt-0 cursor-pointer ${
                  tab === "all-tasks" ? "border-b-2 border-cyan-500" : ""
                }`}
                onClick={() => toggleTabs("all-tasks")}
              >
                All Tasks
              </p>
              <p
                className={`text-2xl ml-6 text-center mb-6 mt-4 md:mt-0 cursor-pointer ${
                  tab === "favorites" ? "border-b-2 border-cyan-500" : ""
                }`}
                onClick={() => toggleTabs("favorites")}
              >
                Favorites
              </p>
            </div>
            {tab === "all-tasks" ? (
              <div>
                {allTask.length > 0 ? (
                  allTask.map((singleTask, index) => (
                    <ul className="flex justify-evenly" key={index}>
                      <li className="w-1/4">
                        {index + 1}. {singleTask.task}
                      </li>
                      <li className="w-1/4 overflow-auto">{singleTask.desc}</li>
                      <li>
                        <i onClick={() => addTaskToFavHandler(index)}>
                          {singleTask.isFav ? (
                            <TiHeartFullOutline
                              cursor="pointer"
                              fontSize={24}
                              color="red"
                            />
                          ) : (
                            <FaRegHeart
                              cursor="pointer"
                              fontSize={20}
                              color="red"
                            />
                          )}
                        </i>
                      </li>
                      <li>
                        <i onClick={() => editTaskHandler(index)}>
                          <CiEdit cursor="pointer" fontSize={25} color="blue" />
                        </i>
                      </li>
                      <li>
                        <i onClick={() => deleteTaskHandler(index)}>
                          <RiDeleteBin6Line
                            cursor="pointer"
                            fontSize={22}
                            color="red"
                          />
                        </i>
                      </li>
                    </ul>
                  ))
                ) : (
                  <p className="text-red-400 text-center">No Tasks</p>
                )}
              </div>
            ) : (
              <div>
                {allTask.map(
                  (singleTask, index) =>
                    singleTask.isFav && (
                      <ul className="flex justify-evenly" key={index}>
                        <li className="w-1/4">
                          {index + 1}. {singleTask.task}
                        </li>
                        <li className="w-1/4 overflow-auto">
                          {singleTask.desc}
                        </li>
                        <li>
                          <i onClick={() => addTaskToFavHandler(index)}>
                            {singleTask.isFav ? (
                              <TiHeartFullOutline
                                cursor="pointer"
                                fontSize={24}
                                color="red"
                              />
                            ) : (
                              <FaRegHeart
                                cursor="pointer"
                                fontSize={20}
                                color="red"
                              />
                            )}
                          </i>
                        </li>
                        <li>
                          <i onClick={() => editTaskHandler(index)}>
                            <CiEdit
                              cursor="pointer"
                              fontSize={25}
                              color="blue"
                            />
                          </i>
                        </li>
                        <li>
                          <i onClick={() => deleteTaskHandler(index)}>
                            <RiDeleteBin6Line
                              cursor="pointer"
                              fontSize={22}
                              color="red"
                            />
                          </i>
                        </li>
                      </ul>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoApp;
