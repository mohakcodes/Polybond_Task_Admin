import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import api from "../axios/api.js";

import Select from 'react-select' 

function TaskScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentDescription, setCurrentDescription] = useState([]);

  const [assignedDate, setAssignedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescriptions, setTaskDescriptions] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getUsers = async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}staff/get`,{
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      setCurrentUsers(response.data);
      const allUsers = response.data.map((user)=>({
          value: user._id,
          label: user.staff_name
      }))
      setOptions(allUsers);
    }
    catch(error){
      console.log(error)
    }
  };

  const getTasks = async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}task_tbl/pending-task`,{
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        withCredentials: true,
      })
      // const response = await api.post("task_tbl/add", {
      //   task_assign_to: assignedTo.join(','),
      //   task_title: taskTitle,
      //   task_assign_date: startDate,
      //   task_description: taskDescriptions.join(','),
      //   task_due_date: endDate,
      // })
      console.log("RES",response.data);
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getUsers();
    getTasks();
  },[])

  return (
    <div className="overflow-y-scroll h-[calc(100vh-80px)] w-full p-4 bg-gray-100">
      <div className="flex justify-between mb-4 mt-1">
        <h2 className="text-lg font-bold text-gray-800">Task List</h2>
        <button
          onClick={openModal}
          type="submit"
          class="flex  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm "
        >
          Create Task
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total Task */}
        <div className="bg-white p-7 rounded-lg shadow flex items-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mr-8 ml-4">
            <img src="/assets/images/task.png" alt="" height="32" width="32" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-blue-600">
              {tasks.length}
            </h2>
            <p className="text-base text-gray-500 font-semibold">Total Task</p>
          </div>
        </div>

        {/* Complete Task */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-8 ml-4">
            <img
              src="/assets/images/checklist.png"
              alt=""
              height="32"
              width="32"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-green-600">
              {
                tasks.filter((task) => task.task_status % 3 === 0).length
              }
            </h2>
            <p className="text-base text-gray-500 font-semibold">
              Complete Task
            </p>
          </div>
        </div>

        {/* Pending Task */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-full mr-8 ml-4">
            <img
              src="/assets/images/pending-tasks.png"
              alt=""
              height="32"
              width="32"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-yellow-600">
              {
                tasks.filter((task) => task.task_status % 3 === 1).length
              }
            </h2>
            <p className="text-base text-gray-500 font-semibold">
              Pending Task
            </p>
          </div>
        </div>

        {/* Incomplete Task */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 flex items-center justify-center rounded-full mr-8 ml-4">
            <img
              src="/assets/images/remove.png"
              alt=""
              height="30"
              width="28"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-red-600">
              {
                tasks.filter((task) => task.task_status % 3 === 2).length
              }
            </h2>
            <p className="text-base text-gray-500 font-semibold">
              Incomplete Task
            </p>
          </div>
        </div>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="text-sm text-gray-500 flex justify-between">
              <span>
                {new Date(task.task_assign_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span
                className={`inline-block px-3 py-1 rounded text-xs font-semibold ${task.task_status % 3 === 0
                  ? "bg-green-100 text-green-600"
                  : task.task_status % 3 === 1
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                  }`}
              >
                {task.task_status % 3 === 0
                  ? "Success"
                  : task.task_status % 3 === 1
                    ? "Pending"
                    : "Incomplete"}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{task.task_title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {task.task_descriptions.map((description, index) => (
                <span key={index} className="mb-1">
                  {description.desc_name}
                  <span>, </span>
                </span>
              ))}
            </p>
            <hr />
            <div className="text-sm text-gray-500 flex justify-between mt-2 mb-1">
              <span>Assign</span>
              <span>Deadline</span>
            </div>
            <div className="text-sm text-gray-500 flex justify-between font-semibold">
              <span>
                {task.assignToNames &&
                  task.assignToNames.map((name, index) => (
                    <span key={index}>
                      {name}
                      {index < task.assignToNames.length - 1 && " & "}
                    </span>
                  ))}
              </span>
              <span className="text-right">
                {new Date(task.task_due_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Task</h2>

              <X className="cursor-pointer" onClick={closeModal} />
            </div>

            {/* Modal Content */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Date Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Assign Date
                  </label>
                  <input
                    type="date"
                    value={assignedDate}
                    onChange={(e) => setAssignedDate(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>

              {/* Select User */}
              <div>
                <label 
                  className="block text-sm font-semibold mb-1"
                >
                  Select User
                </label>
                <Select
                  isMulti
                  options={options}
                  value={selectedUsers}
                  onChange={handleUserChange}
                  className="basic-multi-select border"
                  classNamePrefix="select"
                />
              </div>

              {/* Task Title */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Enter Task Title"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              {/* Description */}
              <div className="border p-2 rounded-md">
                <label className="block text-sm font-semibold mb-1">
                  Description
                </label>
                <div className="relative w-full">
                  <input 
                    placeholder="Task Description"
                    value={currentDescription}
                    onChange={(e) => setCurrentDescription(e.target.value)}
                    className="border-none rounded px-3 py-2 outline-none bg-gray-100 w-[90%] mt-1"
                  >
                  </input>
                  <div className="w-[10%]">
                    <button
                      onClick={handleAddDescription}
                      type="button"
                      className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <hr className="border-t-1 my-4 border-gray-800" />
                <div className="p-2 h-24 overflow-y-auto border border-gray-300 rounded-md">
                  {taskDescriptions.map((description, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-start px-1 py-1 space-x-2"
                    >
                      <p className="text-base text-gray-900 break-words w-[90%]">
                        {description}
                        <hr className="mt-2"/>
                      </p>
                      <button 
                        onClick={handleRemoveDescription}
                        type="button"
                        className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                 <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskScreen;
