import React from 'react';
import { auth, googleProvider } from '../../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate(); // To handle navigation

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      localStorage.setItem("user",user.email);
      onLogin(user);
    } catch (error) {
        alert("Error during Google login");
      console.error('Error during Google login:', error);
    }
  };

  // Animation variants
  // const containerVariants = {
  //   hidden: { opacity: 0, scale: 0.9, y: 50 },
  //   visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  // };

  // const buttonVariants = {
  //   hover: { scale: 1.1, boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.3)' },
  //   tap: { scale: 0.95 },
  // };

  return (
    // <motion.div
    //   initial="hidden"
    //   animate="visible"
    //   variants={containerVariants}
    //   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    // >
    //   <motion.h2
    //     initial={{ y: -10, opacity: 0 }}
    //     animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
    //   >
    //     Welcome! Please log in to continue
    //   </motion.h2>
    //   <table style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
    //     <tbody>
    //       <tr>
    //         <td style={{ padding: '10px', textAlign: 'right' }}>
    //           <strong>Login Option:</strong>
    //         </td>
    //         <td style={{ padding: '10px' }}>
    //           <motion.button
    //             onClick={handleGoogleLogin}
    //             variants={buttonVariants}
    //             whileHover="hover"
    //             whileTap="tap"
    //             style={{
    //               padding: '10px 20px',
    //               fontSize: '16px',
    //               borderRadius: '5px',
    //               cursor: 'pointer',
    //             }}
    //           >
    //             Login with Google
    //           </motion.button>
    //         </td>
    //       </tr>
    //       <tr>
    //         <td colSpan="2" style={{ textAlign: 'center', paddingTop: '20px' }}>
    //           <motion.button
    //             onClick={() => navigate('/SignUp')} // Navigate to SignUp
    //             variants={buttonVariants}
    //             whileHover="hover"
    //             whileTap="tap"
    //             style={{
    //               padding: '10px 20px',
    //               fontSize: '16px',
    //               borderRadius: '5px',
    //               cursor: 'pointer',
    //               backgroundColor: '#4CAF50',
    //               color: 'white',
    //               border: 'none',
    //             }}
    //           >
    //             Don't have an account? Sign Up
    //           </motion.button>
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </motion.div>

<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=''>
                <img src="civic safty long.png" className="w-2/3 h-auto mx-auto object-cover object-center" alt="Logo" />
            </div>
            <div className="mt-12 flex flex-col items-center">
                <h1 className="text-xl xl:text-2xl font-bold">Login to your account</h1>
                <div className="w-full flex-1 mt-8">
                    <div className="flex flex-col items-center">
                        <button onClick={handleGoogleLogin} className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                            <div className="bg-white p-2 rounded-full">
                                <svg className="w-4" viewBox="0 0 533.5 544.3">
                                    <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                                    <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                                    <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                                    <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                                </svg>
                            </div>
                            <span className="ml-4">Log In with Google</span>
                        </button>
                    </div>

                    <div className="my-12 border-b text-center">
                        <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                        Don't have an account? Sign Up here...
                        </div>
                    </div>

                    <div className="mx-auto max-w-xs">
                        <button onClick={() => navigate('/SignUp')} className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">Sign Up</span>
                        </button>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            I agree to abide by templatana's
                            <a href="#" className="border-b border-gray-500 border-dotted">Terms of Service</a>
                            and its
                            <a href="#" className="border-b border-gray-500 border-dotted">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('cover1.png')" }}>
            </div>
        </div>
    </div>
</div>

  );
};


export default Login;
