import { X } from "lucide-react";
import React, { useState } from "react";

function TaskScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="text-sm text-gray-500 flex justify-between">
              <span>14 Nov 2024</span>
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

            <h3 className="font-semibold text-lg mb-2">I am Title</h3>
            <p className="text-sm text-gray-600 mb-2">
              {
                task.task_descriptions.map((description, index) => () => (
                  <span key={index}>
                    Hii .
                    {/* {index < task.task_descriptions.length - 1 && ' & '} */}
                  </span>
                ))
              }
            </p> <hr />
            <div className="text-sm text-gray-500 flex justify-between mt-2 mb-1">
              <span>Assign</span>
              <span>Deadline</span>
            </div>
            <div className="text-sm text-gray-500 flex justify-between font-semibold">
              <span>Lumesh & 1</span>
              <span>15 Nov 2024</span>
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
                <label className="block text-sm font-semibold mb-1">
                  Select User
                </label>
                <select className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200">
                  <option>Choose User</option>
                  <option>User 1</option>
                  <option>User 2</option>
                </select>
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
