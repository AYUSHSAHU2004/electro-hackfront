import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostIssue = () => {
  const email = localStorage.getItem("user");
  const [data, setData] = useState([]);
 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    tags: "",
    imageUrl: null,
    previewUrl: null,
    publicCheck: "",
    authorityCheck: "",
    problemDetail: "",
  });

  // Fetch data from the API
  useEffect(() => {

    const fetchData = async () => {
      try {
        const url = `http://localhost:5000/problems/getProblem/${email}`;
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        // setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  // Handle input changes
  const handleAuthorityInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    setFormData((prevState) => ({
      ...prevState,
      imageUrl: file,
      previewUrl: previewUrl,
    }));
  };
  const handleUpdate = async (index) =>{
    navigate(`/user/dashboard/UpdatePublic/${index}`);
  }
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("location", formData.location);
      formDataToSend.append("email", email);
      formDataToSend.append("problemDetail", formData.problemDetail);
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("publicCheck", formData.publicCheck || false);
      formDataToSend.append("authorityCheck", formData.authorityCheck || false);
      if (formData.imageUrl) {
        formDataToSend.append("imageUrl", formData.imageUrl);
      }

      const response = await axios.post(
        "http://localhost:5000/problems/createProblem",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        console.log("Problem successfully posted!");
        // Reset the form
        setFormData({
          location: "",
          tags: "",
          imageUrl: null,
          previewUrl: null,
          publicCheck: "",
          authorityCheck: "",
          problemDetail: "",
        });
      }
    } catch (error) {
      console.error("Error during problem submission:", error);
      // setError("Submission failed. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col mx-3 mt-6 lg:flex-row">
        {/* Form Section */}
        <div className="w-full lg:w-1/3 m-1">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white shadow-md p-6"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                  Problem Tag
                </label>
                <input
                  name="tags"
                  value={formData.tags}
                  onChange={handleAuthorityInputChange}
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  placeholder="Tag Department"
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                  Location
                </label>
                <input
                  value={formData.location}
                  onChange={handleAuthorityInputChange}
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  name="location"
                  placeholder="Enter Location"
                  required
                />
              </div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                  Problem Description
                </label>
                <textarea
                  value={formData.problemDetail}
                  onChange={handleAuthorityInputChange}
                  rows="4"
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  name="problemDetail"
                  required
                ></textarea>
              </div>
              <div className="w-full px-3 mb-8">
                <label
                  className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                  htmlFor="dropzone-file"
                >
                  {formData.previewUrl ? (
                    <img
  src={formData.previewUrl}
  alt=""
  className="h-32 w-32 object-cover"
/>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-green-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                        Image Proofs
                      </h2>
                      <p className="mt-2 text-gray-500 tracking-wide">
                        Upload or drag & drop your file (SVG, PNG, JPG, or GIF).
                      </p>
                    </>
                  )}
                  <input
                    onChange={handleFileChange}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                  />
                </label>
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <button
                  type="submit"
                  className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  Post Problem
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="w-full lg:w-2/3 m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200">
          <div className="overflow-x-auto rounded-lg p-3">
            <table className="table-auto w-full">
              <thead className="text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto">
                <tr>
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Tag</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-2 text-left">{index + 1}</td>
                    <td className="p-2 text-left">{item.tags}</td>
                    <td className="p-2 text-left">{item.problemDetail}</td>
                    <td className="p-2 text-center">
                      <button onClick={()=>handleUpdate(item._id)} className="rounded-md bg-blue-500 text-white p-2 hover:bg-blue-700">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostIssue;

