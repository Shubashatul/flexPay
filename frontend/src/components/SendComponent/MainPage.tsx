import { useAppSelector } from "../../store/hook.tsx";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useTransaction } from "../../ContextApi/TransacationProvider.tsx";

export default function MainPage() {
  const { user, isLoading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const { setReceiver } = useTransaction(); // Access the setReceiver function from context
  const [sendUser, setSendUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-600 to-blue-900 text-white p-5 flex flex-col justify-center items-center space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold">Transfer</h2>
        <p className="text-lg text-gray-300">Send money easily and securely</p>
      </div>

      {/* Transaction Info */}
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
        {/* Loading/Error State */}
        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Content */}
        {!isLoading && user && (
          <>
            {/* Title */}
            <div className="flex items-center space-x-4 border-b pb-4 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-blue-600"
              >
                <path d="M21.0082 3C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM20 5H4V19H20V5ZM18 15V17H6V15H18ZM12 7V13H6V7H12ZM18 11V13H14V11H18ZM10 9H8V11H10V9ZM18 7V9H14V7H18Z"></path>
              </svg>
              <h3 className="text-xl font-semibold">Transaction Details</h3>
            </div>

            {/* UID and Email */}
            <div className="flex justify-between text-gray-700 mb-4">
              <div className="text-lg">
                <strong>UID:</strong> <span>{user.upiId || "N/A"}</span>
              </div>
              <div className="text-lg">
                <strong>Email:</strong> <span>{user.email}</span>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div>
                <input
                  onChange={(e) => setSendUser(e.target.value)}
                  value={sendUser}
                  type="text"
                  placeholder="Enter Email/UID"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}

            {/* Submit Button */}
            <div className="mt-6">
              <button
                onClick={() => {
                  const token = localStorage.getItem("authToken");

                  // Validate input
                  if (!sendUser) {
                    setErrorMessage("Please enter a valid UID or email.");
                    return;
                  }

                  setErrorMessage("");

                  // Verify the user via an API call
                  axios
                    .get("https://api.flexpay.raj100xdev.me/api/user/checkUser", {
                      params: { userEmail: sendUser },
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                    .then(() => {
                 
                      // Store the verified email/UPI ID in the context
                      setReceiver(sendUser);

                      // Navigate to the next page
                      navigate("/TransferMoney");
                    })
                    .catch((error) => {
                      console.error(
                        "Error checking user:",
                        error.response?.data || error.message
                      );
                      setErrorMessage(
                        error.response?.data?.message || "Something went wrong."
                      );
                    });
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md shadow-md font-bold"
              >
                Verify User
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
