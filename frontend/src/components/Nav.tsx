import { useNavigate } from "react-router-dom";
import LoginIcon from "./LoginIcon";

export default function Nav() {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-16 w-full flex justify-between items-center px-10 shadow-lg">
            <div className="text-white font-bold text-2xl">Flex-Pay</div>

            <div className="flex gap-6">
                {/* Sign In Button */}
                <LoginIcon
                    label="Sign In"
                    onClick={() => navigate("/Signin")}
                    className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-800 py-2 px-5 rounded-lg transition-all duration-300"
                />

                {/* Sign Up Button */}
                <LoginIcon
                    label="Sign Up"
                    onClick={() => navigate("/Signup")}
                    className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-800 py-2 px-5 rounded-lg transition-all duration-300"
                />
            </div>
        </div>
    );
}
