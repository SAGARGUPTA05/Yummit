import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
