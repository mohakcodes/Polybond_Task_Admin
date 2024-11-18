import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Link } from "react-router-dom";

function DashboardScreen() {
  const dataOrders = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "Orders",
        data: [100, 200, 456, 150, 300, 400, 350],
        borderColor: "red",
        backgroundColor: "#FEE2E2",
        pointBackgroundColor: "red",
        pointBorderColor: "red",
        pointBorderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const dataRevenue = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "Revenue",
        data: [150, 250, 500, 220, 420, 450, 380],
        borderColor: "blue",
        backgroundColor: "#DBEAFE",
        pointBackgroundColor: "blue",
        pointBorderColor: "blue",
        pointBorderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const dataUserEngagement = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "User Engagement",
        data: [200, 150, 300, 250, 370, 330, 410],
        borderColor: "green",
        backgroundColor: "#DCFCE7",
        pointBackgroundColor: "green",
        pointBorderColor: "green",
        pointBorderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          drawBorder: false,
        },
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div className="overflow-y-scroll h-[calc(100vh-80px)] w-full p-6 bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Revenue Over Time Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">First Chart</h2>
          <div className="w-full" style={{ height: "90%" }}>
            <Line data={dataRevenue} options={options} />
          </div>
        </div>

        {/* User Engagement Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Second Chart</h2>
          <div className="w-full" style={{ height: "90%" }}>
            <Line data={dataUserEngagement} options={options} />
          </div>
        </div>
        {/* Task Report Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Task Report</h2>
          <div className="w-full" style={{ height: "85%" }}>
            <Line data={dataOrders} options={options} />
          </div>
        </div>
        {/* Recent Orders Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Recent Tasks</h2>
            <Link to="/task" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center font-semibold">
              All Task
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="text-center">
                  <th className="px-4 py-4 border-b">SN</th>
                  <th className="px-4 py-4 border-b">Task Title</th>
                  <th className="px-4 py-4 border-b">Assigned To</th>
                  <th className="px-4 py-4 border-b">Assigned Date</th>
                  <th className="px-4 py-4 border-b">Due Date</th>
                  <th className="px-4 py-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { id: 1, task_title: 'Task 1', assignToNames: 'Lumesh', task_assign_date: '25 Oct 2024', task_due_date: '26 Nov 2024', status: 'Pending' },
                  { id: 2, task_title: 'Task 2', assignToNames: 'Sarover', task_assign_date: '25 Oct 2024', task_due_date: '26 Nov 2024', status: 'Pending' },
                  { id: 3, task_title: 'Task 3', assignToNames: 'Leela', task_assign_date: '25 Oct 2024', task_due_date: '26 Nov 2024', status: 'Incomplete' },
                  { id: 4, task_title: 'Task 4', assignToNames: 'Kaif', task_assign_date: '25 Oct 2024', task_due_date: '26 Nov 2024', status: 'Pending' },
                  { id: 5, task_title: 'Task 5', assignToNames: 'Virendra', task_assign_date: '25 Oct 2024', task_due_date: '26 Nov 2024', status: 'Incomplete' },
                  { id: 6, task_title: 'Task 6', assignToNames: 'Mohak', task_assign_date: '25 Oct 2024', task_due_date: '26 Nov 2024', status: 'Incomplete' },
                ].map((row, index) => (
                  <tr key={row.id} className="text-center hover:bg-gray-100 transition duration-200 ease-in-out">
                    <td className="px-4 py-3">{row.id}</td>
                    <td className="px-4 py-3">{row.task_title}</td>
                    <td className="px-4 py-3">{row.assignToNames}</td>
                    <td className="px-4 py-3">{row.task_assign_date}</td>
                    <td className="px-4 py-3">{row.task_due_date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${row.status === 'Completed' ? 'bg-green-100 text-green-600 font-semibold' : row.status === 'Pending' ? 'bg-yellow-100 text-yellow-600 font-semibold' : 'bg-red-100 text-red-600 font-semibold'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      
      </div>
    </div>
  );
}

export default DashboardScreen;
