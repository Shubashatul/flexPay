import  { useState } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { IoIosSearch } from "react-icons/io";
import { MdRecentActors } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { RiFileTransferLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const sidebarItems = [
    { icon: MdDashboard, label: 'Home', route: '/Dashboard', color: 'bg-blue-500' },
    { icon: IoIosSearch, label: 'Search', route: '/Search', color: 'bg-green-500' },
    { icon: RiFileTransferLine, label: 'Transfer', route: '/transfer', color: 'bg-yellow-500' },
    { icon: MdRecentActors, label: 'Recent', route: '#', color: 'bg-purple-500' }, // # as placeholder for recent
  ];

  return (
    <div className={`fixed left-0 top-0 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-16'}`}>
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-9 bg-gray-800 text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isExpanded ? <FaChevronLeft className="w-4 h-4" /> : <FaChevronRight className="w-4 h-4" />}
      </button>

      <nav className="flex flex-col h-full">
        <ul className="flex-1 py-4 space-y-4">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.route}
                className={`flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${item.color}`}
                aria-label={item.label}
              >
                <item.icon className="w-6 h-6" />
                {isExpanded && <span className="transition-opacity duration-200">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Settings at the bottom */}
        <div className="mt-auto py-4">
          <Link
            to="#"
            className="flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-red-500"
            aria-label="Settings"
          >
            <CiSettings className="w-6 h-6" />
            {isExpanded && <span className="transition-opacity duration-200">Settings</span>}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
