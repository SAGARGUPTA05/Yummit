import React from "react";
import { useRestaurantStore } from "../../store/useRestaurantStore";
import { useThemeStore } from "../../store/useThemeStore";

function FilterPage() {
  const filterOptions = [
    { id: "burgur", label: "Burgur" },
    { id: "thali", label: "Thali" },
    { id: "momos", label: "Momos" },
    { id: "briyani", label: "Briyani" },
    { id: "springroll", label: "Spring Roll" },
  ];

  const { setAppliedFilter, appliedFilter, resetAppliedFilter } = useRestaurantStore();
  const { theme } = useThemeStore();

  const appliedFilterHandler = (value) => {
    setAppliedFilter(value);
  };

  const handleReset = () => {
    resetAppliedFilter();
  };

  return (
    <div className={`md:w-72 p-4 rounded-lg ${
      theme === "dark" ? "bg-[#121212] text-[#E0E0E0]" : ""
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <button onClick={handleReset} className="btn-orange ml-4">
          Reset
        </button>
      </div>
      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-4">
          <input
            id={option.id}
            type="checkbox"
            checked={appliedFilter.includes(option.label)}
            onChange={() => appliedFilterHandler(option.label)}
            className={`cursor-pointer ${
              theme === "dark" ? "accent-[#888888]" : ""
            }`}
          />
          <label
            className={`text-lg font-medium leading-none cursor-pointer ${
              theme === "dark" ? "text-[#E0E0E0]" : ""
            }`}
            htmlFor={option.id}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}

export default FilterPage;
