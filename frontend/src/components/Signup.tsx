import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [WalletPin, setWalletPin] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // For errors
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // For success

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate empty fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !WalletPin) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Validate WalletPin length
    if (WalletPin.length !== 4) {
      setErrorMessage("Wallet Pin must be 4 digits.");
      return;
    }

    // Make the API call to register the user
    axios
      .post("https://api.flexpay.raj100xdev.me/api/user/signup", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        WalletPin,
      })
      .then(() => {
        setSuccessMessage("Signup successful! Redirecting to login...");
        setErrorMessage(null); // Clear any previous error messages
        setTimeout(() => {
          navigate("/Signin");
        }, 2000); // Redirect after 2 seconds
      })
      .catch((err) => {
        // Display specific error from the backend
        setErrorMessage(err.response?.data?.error || "An unexpected error occurred. Please try again.");
      });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-lg w-11/12 max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="bg-blue-600 text-white flex-1 flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-lg">
            Sign up to access all features and start your journey with us.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Your Account</h2>

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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email Section */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Wallet Pin */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Wallet Pin</label>
              <input
                type="password"
                placeholder="Enter Wallet Pin"
                value={WalletPin}
                onChange={(e) => setWalletPin(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500">------------------ or ------------------</span>
          </div>

          {/* Sign In Button */}
          <button
            onClick={() => navigate("/Signin")}
            className="w-full bg-gray-200 text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
