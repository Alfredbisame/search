"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, MapPin, Search, Sun, Moon } from "lucide-react";
import clsx from "clsx";

const SearchPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const popularSearches = [
    "cat", "tapes", "decoration", "lubricants", "engine",
    "Carpet", "gasket", "shaft", "doors", "bolts",
    "shock absorbers", "under", "tyres", "Batteries", "speakers",
    "dogs", "bitters", "local drinks", "schnapps", "wine",
    "energy drinks", "non-alcoholics", "alcoholics", "others"
  ];
  
  return (
    <div className={clsx("min-h-screen transition-colors", darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900")}>
      {/* Header */}
      <div className="p-4 bg-blue-950 shadow-md flex items-center justify-between">
        <button className="p-2 bg-blue-900 text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 ring-orange-500 ring-1 rounded-full shadow">
          <MapPin size={18} />
          <span className="text-sm font-medium">Accra Metropolitan</span>
        </div>
      </div>
      
      {/* Heading */}
      <h2 className="text-xl font-semibold p-4 text-gray-600 dark:text-gray-300">Popular Searches</h2>
      
      {/* Search Bar */}
      <div className="mx-4 flex items-center bg-gray-200 dark:bg-blue-950 rounded-full p-2 shadow-md ring-orange-500 ring-1">
        <Search size={20} className="text-gray-400 mx-2" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full outline-none bg-transparent text-gray-700 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Popular Searches */}
      <div className="p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {popularSearches.map((item, index) => (
            <button
              key={index}
              className={clsx(
                "px-3 py-2 text-sm border rounded-full shadow-sm transition",
                darkMode ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-200",
                (item === "shock absorbers" || item === "under") && "text-xs py-1"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-4 right-4 p-3 rounded-full shadow-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default SearchPage;
