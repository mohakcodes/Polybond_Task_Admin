import { X } from "lucide-react";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Select from 'react-select' 

function TaskScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [tasks, setTasks] = useState([]);

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
      });
      setTasks(response.data.data);
      console.log(response.data.data);
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
        <button onClick={openModal} type="submit" class="flex  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm ">Create Task</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total Task */}
        <div className="bg-white p-7 rounded-lg shadow flex items-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mr-8 ml-4">
            <img src="/assets/images/task.png" alt="" height="32" width="32" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-blue-600">20</h2>
            <p className="text-base text-gray-500 font-semibold">Total Task</p>
          </div>
        </div>

        {/* Complete Task */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-8 ml-4">
            <img src="/assets/images/checklist.png" alt="" height="32" width="32" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-green-600">10</h2>
            <p className="text-base text-gray-500 font-semibold">Complete Task</p>
          </div>
        </div>

        {/* Pending Task */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-full mr-8 ml-4">
            <img src="/assets/images/pending-tasks.png" alt="" height="32" width="32" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-yellow-600">05</h2>
            <p className="text-base text-gray-500 font-semibold">Pending Task</p>
          </div>
        </div>

        {/* Incomplete Task */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 flex items-center justify-center rounded-full mr-8 ml-4">
            <img src="/assets/images/remove.png" alt="" height="30" width="28" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-red-600">05</h2>
            <p className="text-base text-gray-500 font-semibold">Incomplete Task</p>
          </div>
        </div>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            onClick={openModal}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-sm text-gray-500 flex justify-between">
              <span>
                {new Date(task.task_assign_date).toLocaleDateString("en-GB",{
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span
                className={`inline-block px-3 py-1 rounded text-xs font-semibold ${index % 3 === 0
                  ? "bg-green-100 text-green-600"
                  : index % 3 === 1
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                  }`}
              >
                {index % 3 === 0
                  ? "Success"
                  : index % 3 === 1
                    ? "Pending"
                    : "Incomplete"}
              </span>
            </div>

            <h3 className="font-semibold text-lg mb-2">{task.task_title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Make dribbble shots for studio portfolio needs and your own
              portfolio.
            </p> <hr />
            <div className="text-sm text-gray-500 flex justify-between mt-2 mb-1">
              <span>Assign</span>
              <span>Deadline</span>
            </div>
            <div className="text-sm text-gray-500 flex justify-between font-semibold">
              <span>
                {task.assignToNames.map((name, index) => (
                  <span key={index}>
                    {name}
                    {index < task.assignToNames.length - 1 && ' & '}
                  </span>
                ))}
              </span>
              <span className="text-right">15 Nov 2024</span>
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
             
              <X className="cursor-pointer"  onClick={closeModal}/>
            </div>

            {/* Modal Content */}
            <form className="space-y-4">
              {/* Date Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Assign Date
                  </label>
                  <input
                    type="date"
                    className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
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
                  name="colors"
                  options={options}
                  className="basic-multi-select"
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
                  placeholder="Enter Task Title"
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Enter Description"
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  rows="3"
                ></textarea>
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
