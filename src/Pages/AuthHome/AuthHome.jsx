import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthHome = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("user");
  const [data, setData] = useState(null);
  const [otherData, setOtherData] = useState(null);
  const [activeTab, setActiveTab] = useState("updates");
  const [loading, setLoading] = useState(true);
  const [loc, setLoc] = useState(null);
  const [dep, setDep] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdate = (index) => {
    navigate(`/authority/dashboard/UpdateAuthority/${index}`);
  };

  // Fetch location and department
  useEffect(() => {
    const fetchLocationAndDepartment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/checkAuth/${email}`
        );
        if (response.data.Location && response.data.Department) {
          setLoc(response.data.Location);
          setDep(response.data.Department);
        } else {
          setError("Location or Department missing");
        }
      } catch (err) {
        setError("Error fetching user details: " + err.message);
      }
    };

    fetchLocationAndDepartment();
  }, [email]);

  // Fetch data based on location and department
  useEffect(() => {
    if (!loc || !dep) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/problems/getProblem/${loc}/${dep}`
        );
        setData(response.data.data || []);
      } catch (err) {
        setError("Error fetching pending issues: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchOtherData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/problems/getCompleteProblem/${loc}/${dep}`
        );
        setOtherData(response.data.data || []);
      } catch (err) {
        console.error("Error fetching solved issues: ", err.message);
      }
    };

    fetchData();
    fetchOtherData();
  }, [loc, dep]);

  if (loading) return <p>Loading...</p>;

  const renderContent = () => {
    const currentData = activeTab === "updates" ? data : otherData;
    if (!currentData || currentData.length === 0) {
      return <p>No issues to display</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentData.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full"
          >
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-52">
              <img
                src={item.imageUrl}
                alt="card"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  {item.tags}
                </p>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  {item.location}
                </p>
              </div>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                {item.problemDetail}
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => handleUpdate(item._id)}
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-blue-gray-900/10 text-blue-gray-900 block w-full hover:scale-105"
              >
                Update Issue
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getTitle = () => {
    return activeTab === "updates" ? "Pending Issues" : "Solved Issues";
  };

  return (
    <div className="container mx-auto text-center px-2">
      <div className="mb-4 mt-6">
        <button
          onClick={() => setActiveTab("updates")}
          className={`p-2 rounded ${
            activeTab === "updates"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          } mx-2`}
        >
          Locality Issues
        </button>
        <button
          onClick={() => setActiveTab("other")}
          className={`p-2 rounded ${
            activeTab === "other"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          } mx-2`}
        >
          Solved Issues
        </button>
      </div>
      <h2 className="text-black text-xl md:text-2xl mt-2 mb-2">{getTitle()}</h2>
      {renderContent()}
    </div>
  );
};

export default AuthHome;
