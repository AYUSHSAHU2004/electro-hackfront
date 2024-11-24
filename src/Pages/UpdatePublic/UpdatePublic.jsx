import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateIssue = () => {
  const { id } = useParams(); // Extract `id` from URL params
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: "",
    email: "",
    tags: "",
    imageUrl: null,
    previewUrl: null,
    publicCheck: false,
    authorityCheck: false,
    problemDetail: "",
  });

  useEffect(() => {
    // Fetch problem details by ID when the component loads
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/problems/getProblemDetail/${id}`
        );
        const problem = response.data;

        // Populate form with the fetched data
        setFormData({
          location: problem.location,
          email: problem.email,
          tags: problem.tags,
          imageUrl: problem.imageUrl,
          previewUrl: problem.imageUrl, // Assuming imageUrl is the URL to the image
          publicCheck: problem.publicCheck,
          authorityCheck: problem.authorityCheck,
          problemDetail: problem.problemDetail,
        });
      } catch (error) {
        console.error("Error fetching problem details:", error);
      }
    };

    fetchProblemDetails();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle dropdown change for `publicCheck`
  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value === "true", // Convert string to boolean
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);

    setFormData((prevState) => ({
      ...prevState,
      imageUrl: file,
      previewUrl: previewUrl,
    }));
  };

  // Submit updated form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, delete the problem using its ID
      await axios.delete(`http://localhost:5000/problems/DeleteProblem/${id}`);
      console.log("Problem deleted successfully!");

      const formDataToSend = new FormData();
      formDataToSend.append("location", formData.location);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("problemDetail", formData.problemDetail);
      formDataToSend.append("publicCheck", formData.publicCheck);
      formDataToSend.append("authorityCheck", formData.authorityCheck);
      if (formData.imageUrl instanceof File) {
        formDataToSend.append("imageUrl", formData.imageUrl);
      }

      // Determine the endpoint based on `publicCheck` and `authorityCheck`
      const endpoint =
        (formData.publicCheck && formData.authorityCheck)
          ? "http://localhost:5000/problems/createCompleteProblem"
          : "http://localhost:5000/problems/createProblem";

      // Send the appropriate POST request
      await axios.post(endpoint, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate('/');
      console.log("Problem created successfully!");
    } catch (error) {
      console.error("Error handling problem submission:", error);
    }
  };

  return (
    <div className="bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full bg-white shadow-md p-6">
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Problem Tag</label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="block w-full bg-white text-gray-900 border rounded-lg py-2 px-3"
            type="text"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="block w-full bg-white text-gray-900 border rounded-lg py-2 px-3"
            type="text"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">
            Problem Description
          </label>
          <textarea
            name="problemDetail"
            value={formData.problemDetail}
            onChange={handleInputChange}
            rows="4"
            className="block w-full bg-white text-gray-900 border rounded-lg py-2 px-3"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Public Check</label>
          <select
            name="publicCheck"
            value={formData.publicCheck ? "true" : "false"}
            onChange={handleDropdownChange}
            className="block w-full bg-white text-gray-900 border rounded-lg py-2 px-3"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Image Proofs</label>
          {formData.previewUrl && (
            <img
              src={formData.previewUrl}
              alt="Preview"
              className="h-32 w-32 object-cover mb-4"
            />
          )}
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Update Problem
        </button>
      </form>
    </div>
  );
};

export default UpdateIssue;
