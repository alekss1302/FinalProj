import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const [user, setUser] = useState(null); // User state
    const [sunrise, setSunrise] = useState(null); // Sunrise state
    const [sunset, setSunset] = useState(null); // Sunset state

    const { logout } = useContext(AuthContext); // Logout function from AuthContext

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:5000/api/auth/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data); // Set user data
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };
        fetchUserDetails();
    }, []);

    // Fetch sunrise and sunset data
    useEffect(() => {
        const fetchSunriseSunset = async () => {
            try {
                const lat = 51.5074; // Example latitude for London
                const lon = -0.1278; // Example longitude for London
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
                );
                setSunrise(new Date(response.data.sys.sunrise * 1000).toLocaleTimeString());
                setSunset(new Date(response.data.sys.sunset * 1000).toLocaleTimeString());
            } catch (error) {
                console.error('Error fetching sunrise and sunset data:', error);
                setSunrise('Unavailable');
                setSunset('Unavailable');
            }
        };
        fetchSunriseSunset();
    }, []);

    // Handle loading state
    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <p className="text-xl font-semibold">Loading user data...</p>
                    <p className="text-gray-600">If this takes too long, please log in again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-blue-600">Welcome, {user.name}!</h1>
                <p className="text-center text-gray-700 mt-2">
                    Here’s your personalized dashboard.
                </p>

                {/* Sunrise and Sunset Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-blue-800">Sunrise</h2>
                        <p className="text-lg text-blue-700 mt-2">{sunrise || 'Loading...'}</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-yellow-800">Sunset</h2>
                        <p className="text-lg text-yellow-700 mt-2">{sunset || 'Loading...'}</p>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            logout();
                            window.location.href = '/login';
                        }}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
