import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTransaction } from "../../ContextApi/TransacationProvider.tsx";

export default function TransferMoney() {
  const [amount, setAmount] = useState("");
  const [walletPin, setWalletPin] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { receiver } = useTransaction(); 
  const navigate = useNavigate(); 


  const handleSubmit = async () => {
    // Validate amount (as string)
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage("Please enter a valid amount.");
      setSuccessMessage("");
      return;
    }

    // Validate wallet PIN (must be a string of 4 digits)
    if (!walletPin || walletPin.length !== 4 || isNaN(parseInt(walletPin))) {
      setErrorMessage("Wallet PIN must be a 4-digit number.");
      setSuccessMessage("");
      return;
    }




    // Ensure receiver exists
    if (!receiver || receiver.length === 0) {
      setErrorMessage("Receiver email/UPI ID is not set.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken"); 

       await axios.post(  
        "https://api.flexpay.raj100xdev.me/api/user/transferMoney", 
        
        {
            
          receiverEmail: receiver, // Email or UPI ID of the receiver
          amount: amount, // Send amount as a string
          walletPin: walletPin, // Wallet PIN as a string
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        }
      );

      // If the API call is successful
      setErrorMessage("");
      setSuccessMessage("Transfer successful!");
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to dashboard after success
      }, 2000);
    } catch (error:unknown) {
      // Handle error response
      console.error(error);
      setErrorMessage(
      "Failed to transfer money. Please try again."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-green-400 to-green-800 text-white flex justify-center items-center p-5">
      <div className="bg-white text-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700">Transfer Money</h1>
          <p className="text-gray-500">Enter the amount and wallet PIN to proceed</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Wallet PIN Input */}
          <div>
            <label htmlFor="walletPin" className="block text-sm font-medium text-gray-700">
              Wallet PIN
            </label>
            <input
              id="walletPin"
              type="password"
              placeholder="Enter 4-digit PIN"
              maxLength={4}
              value={walletPin}
              onChange={(e) => setWalletPin(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Error/Success Message */}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        {/* Submit Button */}
        <div>
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Transfer Now
          </button>
        </div>
      </div>
    </div>
  );
}
