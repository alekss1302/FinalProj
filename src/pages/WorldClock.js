import React, { useState, useEffect } from 'react';

const YOUR_GOOGLE_API_KEY = 'AIzaSyD-JV12cN_Ql8B2QgpAUQ8_XnhiZJ6hSg8'; // Replace with your Google API key

const cities = [
    { name: "New York", timezone: "America/New_York", lat: 40.7128, lon: -74.0060 },
    { name: "London", timezone: "Europe/London", lat: 51.5074, lon: -0.1278 },
    { name: "Tokyo", timezone: "Asia/Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "Sydney", timezone: "Australia/Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Dubai", timezone: "Asia/Dubai", lat: 25.276987, lon: 55.296249 },
    { name: "Mumbai", timezone: "Asia/Kolkata", lat: 19.0760, lon: 72.8777 },
    { name: "Moscow", timezone: "Europe/Moscow", lat: 55.7558, lon: 37.6173 },
];


const WorldClock = () => {
    const [timeData, setTimeData] = useState({});

    useEffect(() => {
        const fetchTimes = async () => {
            const updatedTimes = {};
            for (const city of cities) {
                try {
                    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/timezone/json?location=${city.lat},${city.lon}&timestamp=${timestamp}&key=${YOUR_GOOGLE_API_KEY}`
                    );
    
                    if (!response.ok) {
                        throw new Error(`Error fetching data for ${city.name}: ${response.status}`);
                    }
    
                    const data = await response.json();
    
                    // Convert GMT offset and daylight saving time offset to hours
                    const offsetHours = (data.rawOffset + data.dstOffset) / 3600;
                    const localTime = new Date((timestamp + data.rawOffset + data.dstOffset) * 1000);
    
                    updatedTimes[city.name] = {
                        time: localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                        date: localTime.toLocaleDateString(),
                        offset: `GMT ${offsetHours >= 0 ? `+${offsetHours}` : offsetHours}`,
                    };
                } catch (error) {
                    console.error(`Error fetching time for ${city.name}:`, error);
                    updatedTimes[city.name] = { time: "Error", date: "Error", offset: "Error" };
                }
            }
            setTimeData(updatedTimes);
        };
    
        fetchTimes();
    
        // Update every 60 seconds
        const interval = setInterval(fetchTimes, 60000);
        return () => clearInterval(interval);
    }, []);
    

    return (
        <div className="container mx-auto p-6">
    <h1 className="text-center text-4xl font-extrabold text-blue-600 mb-6">World Clock</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
            <div key={city.name} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                <h2 className="text-2xl font-bold text-blue-700">{city.name}</h2>
                <p className="text-4xl font-semibold text-gray-800 mt-2">{timeData[city.name]?.time || 'Loading...'}</p>
                <p className="text-md text-gray-600 mt-2">Date: {timeData[city.name]?.date || 'Loading...'}</p>
                <p className="text-md text-gray-600 mt-1">GMT Offset: {timeData[city.name]?.offset || 'Loading...'}</p>
            </div>
        ))}
    </div>
</div>

    );
};

export default WorldClock;
