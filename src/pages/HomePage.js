import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                Welcome to Time & Date Utilities
            </h1>
            <p className="text-center text-gray-700 mb-8">
                Explore basic utilities below or click on a tab for advanced features.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* World Clock Widget */}
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="text-xl font-bold text-blue-600">World Clock</h2>
                    <p className="text-gray-700">See current time in major cities.</p>
                    <Link to="/world-clock">
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                            Explore
                        </button>
                    </Link>
                </div>

                {/* Weather Widget */}
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="text-xl font-bold text-blue-600">Weather</h2>
                    <p className="text-gray-700">Check the current weather.</p>
                    <Link to="/weather">
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                            Explore
                        </button>
                    </Link>
                </div>

                {/* News Widget */}
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="text-xl font-bold text-blue-600">News</h2>
                    <p className="text-gray-700">Stay updated with the latest news.</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                        Coming Soon
                    </button>
                </div>

                {/* Calculator Widget */}
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="text-xl font-bold text-blue-600">Calculator</h2>
                    <p className="text-gray-700">Perform basic calculations.</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                        Coming Soon
                    </button>
                </div>

                {/* Calendar Widget */}
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="text-xl font-bold text-blue-600">Calendar</h2>
                    <p className="text-gray-700">View important dates.</p>
                    <Link to="/calendar">
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                            Explore
                        </button>
                    </Link>
                </div>

                {/* Countdown Widget */}
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="text-xl font-bold text-blue-600">Countdown</h2>
                    <p className="text-gray-700">Track upcoming events.</p>
                    <Link to="/countdown">
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                            Explore
                        </button>
                    </Link>
                </div>

                {/* Astronomy Widget */}
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="text-xl font-bold text-blue-600">Astronomy</h2>
                    <p className="text-gray-700">Learn about the stars and moon phases.</p>
                    <Link to="/moon-phase">
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                            Explore
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
