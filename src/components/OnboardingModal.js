import React, { useState } from 'react';

const OnboardingModal = ({ closeModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm">
                <h2 className="text-xl font-bold mb-4">Welcome to Time & Date!</h2>
                <p className="mb-4">
                    Here's a quick overview of what you can do:
                    <ul className="list-disc pl-5">
                        <li>Track time zones worldwide</li>
                        <li>Create and share event countdowns</li>
                        <li>Monitor weather updates</li>
                        <li>Explore moon phases</li>
                    </ul>
                </p>
                <button
                    onClick={closeModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default OnboardingModal;
