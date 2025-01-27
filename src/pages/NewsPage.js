import React, { useState, useEffect } from "react";

const NewsPage = () => {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState("general");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = "eb02bb2009c2473a8ac7f57d2c885439" // Replace with your API Key

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch news.");
                }
                const data = await response.json();
                setArticles(data.articles);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [category]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center">Top News</h1>
            <div className="flex justify-center space-x-4 my-4">
                {["general", "technology", "sports", "health", "business"].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`p-2 rounded ${
                            category === cat ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>
            {loading ? (
                <p className="text-center">Loading news...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-white p-4 rounded shadow">
                            <img
                                src={article.urlToImage || "https://via.placeholder.com/300"}
                                alt="News"
                                className="w-full h-40 object-cover rounded"
                            />
                            <h2 className="text-lg font-bold mt-2">{article.title}</h2>
                            <p className="text-sm text-gray-600">{article.description}</p>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline mt-2 inline-block"
                            >
                                Read more
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsPage;
