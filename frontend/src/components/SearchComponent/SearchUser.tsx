import { useState, useEffect } from "react";
import axios from "axios";
import { useTransaction } from "../../ContextApi/TransacationProvider.tsx";
import { useNavigate } from "react-router-dom";

// Define the User type
type User = {
  id: string; // or number, depending on your API
  firstName: string;
  lastName: string;
  email: string;
};

export default function SearchUser() {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]); // Use User[] as the type for the users state
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setReceiver } = useTransaction();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    if (!search.trim()) {
      setUsers([]);
      return;
    }
    try {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axios.get<User[]>( // Specify the expected response type
        `https://api.flexpay.raj100xdev.me/api/user/search/${search.trim()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
      setErrorMessage("");
    } catch (e) {
      
      console.error(e);
      setErrorMessage("Unable to fetch users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Search User
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Find users by entering their name or email in the search bar below.
        </p>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by name or email"
            className="w-full border-2 border-gray-300 p-3 rounded-lg outline-none focus:border-indigo-500 transition duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            className="absolute right-3 top-3 text-gray-400 w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l2 2m-2-2l-2-2m0 8a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
        </div>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {isLoading && <p className="text-center text-gray-500">Loading...</p>}
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition duration-300 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  setReceiver(user.email);
                  navigate("/TransferMoney");
                }}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Send
              </button>
            </li>
          ))}
          {users.length === 0 && !isLoading && (
            <li className="text-gray-500 text-center">No users found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
