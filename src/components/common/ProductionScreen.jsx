import React from 'react';

function ProductionScreen() {
  const data = [
    { id: '1', production_date: '14 Nov 2024', invoice: '145454212', shift: 'Day Shift', machine_id: 'Electric', product_name: 'Bakal', downtime: '9.30 PM', supervisor: 'Sarover Sahu', remark: 'No Remark', },
    { id: '2', production_date: '14 Nov 2024', invoice: '145454212', shift: 'Day Shift', machine_id: 'Electric', product_name: 'Bakal', downtime: '9.30 PM', supervisor: 'Sarover Sahu', remark: 'No Remark', },
    { id: '3', production_date: '14 Nov 2024', invoice: '145454212', shift: 'Day Shift', machine_id: 'Electric', product_name: 'Bakal', downtime: '9.30 PM', supervisor: 'Sarover Sahu', remark: 'No Remark', },
    { id: '4', production_date: '14 Nov 2024', invoice: '145454212', shift: 'Day Shift', machine_id: 'Electric', product_name: 'Bakal', downtime: '9.30 PM', supervisor: 'Sarover Sahu', remark: 'No Remark', },
    { id: '5', production_date: '14 Nov 2024', invoice: '145454212', shift: 'Day Shift', machine_id: 'Electric', product_name: 'Bakal', downtime: '9.30 PM', supervisor: 'Sarover Sahu', remark: 'No Remark', },
    { id: '6', production_date: '14 Nov 2024', invoice: '145454212', shift: 'Day Shift', machine_id: 'Electric', product_name: 'Bakal', downtime: '9.30 PM', supervisor: 'Sarover Sahu', remark: 'No Remark', },
    { id: '7', production_date: '14 Nov 2024', invoice: '145454212', shift: 'Day Shift', machine_id: 'Electric', product_name: 'Bakal', downtime: '9.30 PM', supervisor: 'Sarover Sahu', remark: 'No Remark', },
    { id: '8', production_date: '14 Nov 2024', invoice: '145454212', shift: 'Day Shift', machine_id: 'Electric', product_name: 'Bakal', downtime: '9.30 PM', supervisor: 'Sarover Sahu', remark: 'No Remark', },
    { id: '9', production_date: '14 Nov 2024', invoice: '145454212', shift: 'Day Shift', machine_id: 'Electric', product_name: 'Bakal', downtime: '9.30 PM', supervisor: 'Sarover Sahu', remark: 'No Remark', },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Title */}
      <h2 className="text-lg font-bold text-gray-800 mb-6">Production Report</h2>

      {/* Table Container */}
      <div className="overflow-x-auto">

        <table className="w-full bg-white border border-gray-300">


          {/* Table Head */}
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3 text-gray-600 text-sm font-semibold">SN</th>
              <th className="px-6 py-3 text-gray-600 text-sm font-semibold">Production Date</th>
              <th className="px-6 py-3 text-gray-600 text-sm font-semibold">Invoice</th>
              <th className="px-6 py-3 text-gray-600 text-sm font-semibold">Shift</th>
              <th className="px-6 py-3 text-gray-600 text-sm font-semibold">Machine Id</th>
              <th className="px-6 py-3 text-gray-600 text-sm font-semibold">Product Name</th>
              <th className="px-6 py-3 text-gray-600 text-sm font-semibold">Downtime</th>
              <th className="px-6 py-3 text-gray-600 text-sm font-semibold">Supervisor</th>
              <th className="px-6 py-3 text-gray-600 text-sm font-semibold">Remarks</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 text-sm text-gray-700">{item.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.production_date}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.invoice}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.shift}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.machine_id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.product_name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.downtime}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.supervisor}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.remark}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductionScreen;