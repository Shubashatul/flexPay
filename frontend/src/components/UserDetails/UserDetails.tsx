import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook.tsx";
import { fetchUser } from "../../store/Reducers/UserReducer";

export default function UserDetails() {
  const dispatch = useAppDispatch();
  const { isLoading, user, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-start bg-gradient-to-b from-indigo-50 via-indigo-100 to-indigo-200 py-6 h-96">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-lg p-8 flex-1 h-full relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-800">User Details</h2>
          <p className="text-sm text-indigo-500">{new Date().toLocaleDateString()}</p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        {/* User Details */}
        {user && (
          <div>
            <div className="space-y-6">
              {/* Each Field */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">First Name:</span>
                <span className="font-medium text-indigo-800">{user.firstName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Last Name:</span>
                <span className="font-medium text-indigo-800">{user.lastName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Email:</span>
                <span className="font-medium text-indigo-800">{user.email}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Balance:</span>
                <span className="font-medium text-indigo-800">₹{user.balance}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">UPI ID:</span>
                <span className="font-medium text-indigo-800">{user.upiId}</span>
              </div>
            </div>

            {/* Update Button */}
            <div className="mt-8 flex justify-center">
              <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-500 hover:shadow-md transition duration-300">
                Add Money
              </button>
            </div>
          </div>
        )}

        {/* Decorative Circle */}
        <div className="absolute top-4 right-4 bg-indigo-100 rounded-full w-16 h-16 opacity-30 blur-md"></div>
      </div>
    </div>
  );
}   
