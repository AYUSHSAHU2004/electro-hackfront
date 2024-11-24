import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";

const SignUp = ({ onLogin }) => {
  const [role, setRole] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [PublicState, setPublicState] = useState({ phoneNumber: "" });
  const [AuthorityState, setAuthorityState] = useState({
    phoneNumber: "",
    location: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
  
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem("user", user.email);
      onLogin(user);
  
      if (role === "Public") {
        localStorage.setItem("role", "PUBLIC");
        // Send POST request to Public SignUp endpoint
        const response = await axios.post(
          "http://localhost:5000/users/SignUpPublic",
          {
            email: user.email, // Include email from localStorage
            phoneNumber: PublicState.phoneNumber, // Include phone number from the form
          }
        );
  
        if (response.status === 201) {
          setSuccess("Successfully registered as Public!");
          alert("Successfully registered as Public!");
          setPublicState({ phoneNumber: "" }); // Resetting fields after successful registration
          navigate("/"); // Use the navigate function for redirection
        }
      } else if (role === "Authority") {
        localStorage.setItem("role", "AUTHORITY");
        // Send POST request to Authority SignUp endpoint
        const response = await axios.post(
          "http://localhost:5000/users/SignUpAuthority",
          {
            email: user.email, // Include email from localStorage
            phoneNumber: AuthorityState.phoneNumber, // Include phone number from the form
            Location: AuthorityState.location, // Include location from the form
            Department: AuthorityState.department, // Include department from the form
          }
        );
  
        if (response.status === 201) {
          setSuccess("Successfully registered as Authority!");
          alert("Successfully registered as Authority!");
          setAuthorityState({ phoneNumber: "", location: "", department: "" }); // Resetting fields after successful registration
          navigate('/authority/home');
          // Use the navigate function for redirection
        }
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      setError("Registration failed. Please try again.");
    }
  };

  const handlePublicInputChange = (e) => {
    const { name, value } = e.target;
    setPublicState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAuthorityInputChange = (e) => {
    const { name, value } = e.target;
    setAuthorityState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="civic safty long.png"
              className="w-2/3 h-auto mx-auto object-cover object-center"
              alt="Logo"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-xl xl:text-2xl font-bold">
              Continue to Sign Up
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <select
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="Public">Public</option>
                  <option value="Authority">Authority</option>
                </select>

                {role === "Public" && (
                  <input
                    name="phoneNumber"
                    value={PublicState.phoneNumber}
                    onChange={handlePublicInputChange}
                    required
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    placeholder="Enter your phone number"
                  />
                )}

                {role === "Authority" && (
                  <>
                    <input
                      name="phoneNumber"
                      value={AuthorityState.phoneNumber}
                      onChange={handleAuthorityInputChange}
                      required
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="text"
                      placeholder="Enter your phone number"
                    />
                    <input
                      name="location"
                      value={AuthorityState.location}
                      onChange={handleAuthorityInputChange}
                      required
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="text"
                      placeholder="Enter your location"
                    />
                    <input
                      name="department"
                      value={AuthorityState.department}
                      onChange={handleAuthorityInputChange}
                      required
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="text"
                      placeholder="Enter your department"
                    />
                  </>
                )}

                <button
                  onClick={handleSubmit}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Register</span>
                </button>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Already registered ? Log In here...
                </div>
              </div>

              <div className="flex flex-col items-center">
                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Log In with Google</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by templatana's
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </a>
                  and its
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('cover1.png')" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
