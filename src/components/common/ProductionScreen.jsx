import React, { useEffect, useState } from "react";
import moment from "moment";
import api from "../axios/api";

const today = moment().format("YYYY-MM-DD");

function ProductionScreen() {

  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [loading, setLoading] = useState(true);
  
  const getData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/production/get/?date=${selectedDate}`);
      const apiData = res.data || [];

      const formattedData = apiData.map((item, index) => ({
        id: index + 1,
        pmaterial_item_title:
          item.material_info[0].pmaterial_item_title || "N/A",
        pmaterial_kg: item.material_info[0].pmaterial_kg || "N/A",
        pmaterial_piece: item.material_info[0].pmaterial_piece || "N/A",
        production_date: moment(item.prod_date).format("DD MMM YYYY"),
        prod_time: item.prod_time || "N/A",
        prod_shift: item.prod_shift || "N/A",
        prod_water_temp: item.prod_water_temp || "N/A",
        prod_status: item.prod_status || "N/A",
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching production data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedDate]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Title */}
      <div className="flex justify-between items-center mb-4 mt-1">
        <h2 className="text-lg font-bold text-gray-800">Production Report</h2>
        <input
          type="date"
          className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 w-40 h-12"
          placeholder="Select Date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-gray-600 text-center">Loading...</p>
        ) : data.length > 0 ? (
          <table className="w-full bg-white border border-gray-300">
            {/* Table Head */}
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3 text-gray-600 text-sm font-semibold">
                  SN
                </th>
                <th className="px-6 py-3 text-gray-600 text-sm font-semibold">
                  Material Name
                </th>
                <th className="px-6 py-3 text-gray-600 text-sm font-semibold">
                  Quantity (KG)
                </th>
                <th className="px-6 py-3 text-gray-600 text-sm font-semibold">
                  Piece
                </th>
                <th className="px-6 py-3 text-gray-600 text-sm font-semibold">
                  Production Date
                </th>
                <th className="px-6 py-3 text-gray-600 text-sm font-semibold">
                  Production Time
                </th>
                <th className="px-6 py-3 text-gray-600 text-sm font-semibold">
                  Production Shift
                </th>
                <th className="px-6 py-3 text-gray-600 text-sm font-semibold">
                  Water Temperature
                </th>
                <th className="px-6 py-3 text-gray-600 text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.pmaterial_item_title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.pmaterial_kg}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.pmaterial_piece}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.production_date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.prod_time}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.prod_shift}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.prod_water_temp}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.prod_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 text-center">
            No data available for the selected date.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductionScreen;