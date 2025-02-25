import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();


    if (!username || !password) {
      setErrorMessage("Email and Password are required.");
      return;
    }

    // Validate email format
    if (!emailRegex.test(username)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    // Simulate an API call
    axios
      .post("https://api.flexpay.raj100xdev.me/api/user/signin", {
        email: username,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          const token = res.data.token;
          localStorage.setItem("authToken", token);
          setSuccessMessage("Login successful! Redirecting...");
          setErrorMessage(null);
          setTimeout(() => navigate("/Dashboard"), 2000); // Redirect after 2 seconds
        } else {
          setErrorMessage("Invalid credentials. Please try again.");
        }
      })
      .catch((err) => {
        const backendError = err.response?.data?.error || "An error occurred. Please try again.";
        setErrorMessage(backendError);
      });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-lg w-11/12 max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="bg-blue-600 text-white flex-1 flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg">Sign in to continue to your account.</p>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign In to Your Account</h2>
          
          {/* Success Message */}
          {successMessage && (
            <div className="w-full bg-green-100 text-green-600 p-3 rounded-md text-center border border-green-300 mb-4">
              {successMessage}
            </div>
          )}

          {/* Error Message Display */}
          {errorMessage && (
            <div className="w-full bg-red-100 text-red-600 p-3 rounded-md text-center border border-red-300 mb-4">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSignin} className="space-y-4">
            {/* Email Section */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Section */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500">------------------ or ------------------</span>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={() => navigate("/Signup")}
            className="w-full bg-gray-200 text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
