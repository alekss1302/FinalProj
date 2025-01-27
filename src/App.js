import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WorldClock from "./pages/WorldClock";
import CalendarPage from "./pages/CalendarPage";
import CountdownPage from "./pages/CountdownPage";
import WeatherPage from "./pages/WeatherPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import MoonPhasePage from './pages/MoonPhasePage';
import React, { useState, useEffect, useContext } from 'react';
import OnboardingModal from './components/OnboardingModal';
import { AuthContext } from "./context/AuthContext";
import HomePage from './pages/HomePage';
import NewsPage from "./pages/NewsPage";
import CalculatorPage from "./pages/CalculatorPage";
import AstronomyPage from "./pages/AstronomyPage";

function App() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
        if (!hasSeenOnboarding) {
            setShowOnboarding(true);
            localStorage.setItem('hasSeenOnboarding', 'true');
        }
    }, []);

    return (
        <Router>
            {showOnboarding && <OnboardingModal closeModal={() => setShowOnboarding(false)} />}
            <div className="bg-gray-100 min-h-screen flex flex-col">
                {/* Navbar */}
                <nav className="bg-blue-600 p-4 shadow-md">
                    <ul className="flex justify-center space-x-6 text-white font-semibold">
                        <li className="hover:underline"><Link to="/">Home</Link></li>
                        {isAuthenticated && (
                            <>
                                <li className="hover:underline"><Link to="/dashboard">Dashboard</Link></li>
                                <li className="hover:underline"><Link to="/world-clock">World Clock</Link></li>
                                <li className="hover:underline"><Link to="/calendar">Calendar</Link></li>
                                <li className="hover:underline"><Link to="/countdown">Countdown</Link></li>
                                <li className="hover:underline"><Link to="/weather">Weather</Link></li>
                                <li className="hover:underline"><Link to="/moon-phase">Moon Phase</Link></li>
                                <li className="hover:underline"><Link to="/news">News</Link></li>
                                <li className="hover:underline"><Link to="/calculator">Calculator</Link></li>
                                <li className="hover:underline"><Link to="/astronomy">Astronomy</Link></li>
                            </>
                        )}
                        {!isAuthenticated && (
                            <>
                                <li className="hover:underline"><Link to="/login">Login</Link></li>
                                <li className="hover:underline"><Link to="/register">Register</Link></li>
                            </>
                        )}
                        {isAuthenticated && (
                            <li>
                                <button
                                    onClick={logout}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Main Content */}
                <div className="flex-grow p-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/world-clock" element={<WorldClock />} />
                        <Route path="/weather" element={<WeatherPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/calculator" element={<CalculatorPage />} />
                        <Route path="/astronomy" element={<AstronomyPage />} />
                        <Route path="/calendar" element={<CalendarPage />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/countdown"
                            element={
                                <ProtectedRoute>
                                    <CountdownPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-4">
                    <div className="text-center">
                        <p>&copy; 2025 Time & Date Clone. All Rights Reserved.</p>
                        <ul className="flex justify-center space-x-4 mt-2">
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Terms of Service</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
