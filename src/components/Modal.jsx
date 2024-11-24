import React from "react";

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  console.log(data);
  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-900">{data.tags}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <img
            src={data.imageUrl}
            alt="Sample"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="flex flex-col items-start">
          <p className="text-gray-700 mb-1">Problem Details:{data.problemDetail}</p>
          <p className="text-gray-700 mb-1">Location:{data.location}</p>
          {data ? (
            <div>
                {String(data.publicCheck) === "true" ? (
                <p className="text-gray-700 mb-1">Public Checked: Done</p>
              ) : (
                <p className="text-gray-700 mb-1">Public Checked: Not Done</p>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
            {data ? (
            <div>
              {String(data.authorityCheck) === "true" ? (
                <p className="text-gray-700 mb-1">Authority Checked: Done</p>
              ) : (
                <p className="text-gray-700 mb-1">Authority Checked: Not Done</p>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
          </div>
        </div>
        <div className="px-4 py-4 sm:px-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
