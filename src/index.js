import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App"; // Ensure this matches your App.js file location
import { AuthProvider } from './context/AuthContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);