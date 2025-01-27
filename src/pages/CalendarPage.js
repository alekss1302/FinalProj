import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [eventInput, setEventInput] = useState("");
  const [recurrence, setRecurrence] = useState("None");
  const [reminderTime, setReminderTime] = useState("");
  const [eventColor, setEventColor] = useState("#000000");
  const [dayEvents, setDayEvents] = useState([]);


  // Load events from local storage
  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
  const dateKey = selectedDate.toDateString();
  setDayEvents(events[dateKey] || []);
}, [selectedDate, events]);



  useEffect(() => {
    const now = new Date().getTime();

    Object.entries(events).forEach(([dateKey, eventList]) => {
      const eventDate = new Date(dateKey).getTime();

      eventList.forEach((event) => {
        if (event.reminderTime) {
          const reminderTime = eventDate - event.reminderTime * 60 * 1000;
          if (reminderTime > now) {
            setTimeout(() => {
              alert(`Reminder: ${event.title} is coming up!`);
            }, reminderTime - now);
          }
        }
      });
    });
  }, [events]);

  

  // Save events to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const signInToGoogle = async () => {
    // Implement Google authentication here
    console.log("Google Sign-In functionality");
  };
  
  const createGoogleCalendarEvent = async (event) => {
    // Implement logic to add an event to Google Calendar
    console.log("Create Google Calendar Event:", event);
  };

  const addEvent = () => {
    const dateKey = selectedDate.toDateString();
    const newEvents = { ...events };

    if (recurrence === "Daily") {
      for (let i = 0; i < 7; i++) {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + i);
        const key = nextDate.toDateString();
        newEvents[key] = [...(newEvents[key] || []), eventInput];
      }
    } else if (recurrence === "Weekly") {
      for (let i = 0; i < 4; i++) {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + i * 7);
        const key = nextDate.toDateString();
        newEvents[key] = [...(newEvents[key] || []), eventInput];
      }
    } else {
      newEvents[dateKey] = [...(newEvents[dateKey] || []), eventInput];
    }

    setEvents(newEvents);
    setEventInput("");
    setShowModal(false);
  };

  const removeEvent = (dateKey, index) => {
    setEvents((prev) => {
      const updatedEvents = [...prev[dateKey]];
      updatedEvents.splice(index, 1);
      return updatedEvents.length
        ? { ...prev, [dateKey]: updatedEvents }
        : Object.fromEntries(Object.entries(prev).filter(([key]) => key !== dateKey));
    });
  };

  const tileContent = ({ date }) => {
    const dateKey = date.toDateString();
    if (events[dateKey]?.length) {
      return (
        <div className="bg-blue-200 text-blue-800 rounded-full text-xs p-1">
          {events[dateKey].length} event(s)
        </div>
      );
    }
    return null;
  };

  const exportToCSV = () => {
    const headers = ["Title", "Date", "Recurrence"];
    const rows = events.map((event) => [event.title, event.date, event.recurrence]);
  
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "events.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(events, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "events.json";
    link.click();
  };
  
  

  const generateGoogleCalendarLink = (date, eventTitle) => {
    const baseURL = "https://calendar.google.com/calendar/render";
    const startDate = date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(date.getTime() + 60 * 60 * 1000)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "");

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: eventTitle,
      dates: `${startDate}/${endDate}`,
    });

    return `${baseURL}?${params.toString()}`;
  };

  return (
    
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex gap-4 mt-4">
        <button
          onClick={exportToCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export to CSV
        </button>
        <button
          onClick={exportToJSON}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export to JSON
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Calendar</h1>
        <p className="text-center text-gray-700 mt-2">
          Select a date to add or view events.
        </p>

        {/* Calendar Component */}
        <div className="mt-8 flex justify-center">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent} // Use tileContent here
          />
        </div>

        {/* Events for Selected Date */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-center text-gray-800">
            Events for {selectedDate.toDateString()}:
          </h2>
          <ul className="mt-4 text-center">
            {events[selectedDate.toDateString()]?.length ? (
              events[selectedDate.toDateString()].map((event, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 shadow-md rounded-lg p-2 my-2 max-w-sm mx-auto"
                >
                  <span>{event}</span>
                  <div className="space-x-2">
                    <a
                      href={generateGoogleCalendarLink(selectedDate, event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Add to Google Calendar
                    </a>
                    <button
                      onClick={() =>
                        removeEvent(selectedDate.toDateString(), index)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No events for this date.</p>
            )}
          </ul>
        </div>

        {/* All Events List */}
        <div className="event-list mt-6">
          <h3 className="text-lg font-bold">All Events</h3>
          <ul>
            {Object.entries(events).map(([date, eventList]) =>
              eventList.map((event, index) => (
                <li
                  key={`${date}-${index}`}
                  className="flex justify-between items-center mb-2"
                >
                  <div>
                    <strong>{event}</strong> - {date}
                  </div>
                  <button
                    onClick={() => removeEvent(date, index)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={async () => {
            await signInToGoogle();
            const event = {
              summary: "New Event", // Replace with dynamic event title
              start: {
                dateTime: new Date(selectedDate).toISOString(),
                timeZone: "UTC",
              },
              end: {
                dateTime: new Date(selectedDate.getTime() + 60 * 60 * 1000).toISOString(), // 1-hour duration
                timeZone: "UTC",
              },
            };
            await createGoogleCalendarEvent(event);
            alert("Event added to Google Calendar!");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sync to Google Calendar
        </button>
      </div>


      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Add Event for {selectedDate.toDateString()}
            </h2>
            <input
              type="text"
              value={eventInput}
              onChange={(e) => setEventInput(e.target.value)}
              placeholder="Event Title"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />

            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            >
              <option value="None">None</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Reminder (in minutes before event):
              </label>
              <input
                type="number"
                value={reminderTime || ""}
                onChange={(e) => setReminderTime(e.target.value)}
                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                placeholder="e.g., 30"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Event Color:</label>
              <input
                type="color"
                value={eventColor || "#000000"}
                onChange={(e) => setEventColor(e.target.value)}
                className="w-10 h-10"
              />
            </div>

            {dayEvents.map((event, index) => (
              <div
                key={index}
                style={{ backgroundColor: event.color || "gray" }}
                className="text-xs text-white rounded p-1 mb-1"
              >
                {event.title}
              </div>
            ))}



            <div className="flex justify-end space-x-2">
              <button
                onClick={addEvent}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
              >
                Add Event
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
