import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Send1() {
    const navigate = useNavigate();
    const [isSending, setIsSending] = useState<boolean>(true);

    const handleSendClick = () => {
        setIsSending(true);
    };

    const handleReceiveClick = () => {
        setIsSending(false);
    };

    return (
        <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 h-96">
            <div className="bg-white rounded-lg shadow-xl p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Payment Actions</h2>
                <div className="flex justify-around mb-6">
                    <button
                        onClick={handleSendClick}
                        className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 
                            ${isSending ? 'bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'}`}
                    >
                        Send
                    </button>
                    <button
                        onClick={handleReceiveClick}
                        className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 
                            ${!isSending ? 'bg-green-600' : 'bg-green-400 hover:bg-green-500'}`}
                    >
                        Receive
                    </button>
                </div>

                {isSending ? (
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Send Payment</h3>
                        <p className="text-gray-600 mb-4">Transfer money to your recipient.</p>
                        <button
                            onClick={() => navigate("/transfer")}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-500"
                        >
                            Proceed to Send
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Receive Payment</h3>
                        <p className="text-gray-600 mb-4">Receive funds from a sender.</p>
                        <button
                            onClick={() => navigate("/transfer")}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg w-full hover:bg-green-500"
                        >
                            Proceed to Receive
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
