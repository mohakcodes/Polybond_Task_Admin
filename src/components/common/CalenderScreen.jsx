import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";
import api from "../axios/api.js";
import { X } from "lucide-react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalenderScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchTasksForMonth = async (month) => {
    try {
      const response = await api.get(`task_tbl/month-report/${month}`);
      const tasks = response.data.data || [];
      const formattedTasks = tasks.map((task) => ({
        title: task.task_title,
        start: new Date(task.task_assign_date),
        end: new Date(task.task_due_date),
        assignToNames: task.assignToNames,
        givenByName: task.givenByName,
        status: task.task_status,
      }));

      setEvents(formattedTasks);
  
      // setEvents((prevEvents) => {
      //   const filteredEvents = prevEvents.filter(
      //     (event) =>
      //       !formattedTasks.some(
      //         (newEvent) =>
      //           newEvent.start.getTime() === event.start.getTime() &&
      //           newEvent.title === event.title
      //       )
      //   );
      //   console.log([...filteredEvents, ...formattedTasks])
      //   return [...filteredEvents, ...formattedTasks];
      // });
  
      console.log("Fetched Tasks (FT):", formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  useEffect(() => {
    const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
    console.log(currentMonth);
    fetchTasksForMonth(currentMonth);
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleNavigate = async(date) => {
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    await fetchTasksForMonth(month);
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Calendar</h2>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className="shadow-lg rounded-lg border border-gray-200"
          onSelectEvent={handleEventClick}
          onNavigate={handleNavigate}
          eventPropGetter={(event) => {
            const backgroundColor =
              event.status === 0 ? "green" : event.status === 1 ? "red" : "blue";
            return {
              style: {
                backgroundColor,
                color: "white",
                borderRadius: "5px",
                opacity: 0.8,
                border: "0px",
                display: "block",
              },
            };
          }}
        />
      </div>

      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
        <X className="cursor-pointer text-gray-800 hover:text-red-500" onClick={closeModal} />
      </div>
      <div className="space-y-2">
        <p className="text-gray-700">
          <strong>Title:</strong> {selectedEvent?.title}
        </p>
        <p className="text-gray-700">
          <strong>Assigned To:</strong>{" "}
          {selectedEvent?.assignToNames.join(", ")}
        </p>
        <p className="text-gray-700">
          <strong>Status:</strong>{" "}
          {selectedEvent?.status === 2 ? "Completed" : "Pending"}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CalenderScreen;