import React, { useState } from "react";

const CalculatorPage = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const handleClick = (value) => {
        setInput((prev) => prev + value);
    };

    const handleClear = () => {
        setInput("");
        setResult("");
    };

    const handleCalculate = () => {
        try {
            const calculation = eval(input); // Be cautious with eval in production!
            setResult(calculation);
        } catch (error) {
            setResult("Error");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-4 w-80">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
                    Calculator
                </h1>
                <div className="bg-gray-200 p-2 rounded text-right">
                    <div className="text-lg">{input}</div>
                    <div className="text-xl font-bold">{result}</div>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                    {["7", "8", "9", "/"].map((value) => (
                        <button
                            key={value}
                            className="p-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => handleClick(value)}
                        >
                            {value}
                        </button>
                    ))}
                    {["4", "5", "6", "*"].map((value) => (
                        <button
                            key={value}
                            className="p-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => handleClick(value)}
                        >
                            {value}
                        </button>
                    ))}
                    {["1", "2", "3", "-"].map((value) => (
                        <button
                            key={value}
                            className="p-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => handleClick(value)}
                        >
                            {value}
                        </button>
                    ))}
                    <button
                        className="p-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={handleClear}
                    >
                        C
                    </button>
                    <button
                        className="p-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => handleClick("0")}
                    >
                        0
                    </button>
                    <button
                        className="p-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={handleCalculate}
                    >
                        =
                    </button>
                    <button
                        className="p-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => handleClick("+")}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalculatorPage;
