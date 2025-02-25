import Sidebar from "./SideBar/SideBar";
import UserDetails from "./UserDetails/UserDetails.tsx";
import HomeNavbar from "./HomeNavBar/HomeNavBar.tsx";
import Send1 from "./SendComponent/Send1.tsx";  // Assuming you want to include this later

export default function Dashboard() {
    return (
        <div className="flex min-h-screen w-full bg-cover bg-center bg-fixed" 
             style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?nature,technology")' }}>

            {/* Sidebar Component */}
            <Sidebar />

            <div className="flex flex-col flex-1 w-full">
                {/* HomeNavbar should be always visible on top */}
                <HomeNavbar isExpanded={true} />

                {/* Main Content Area */}
                <div className="flex-1 flex p-4 overflow-auto space-x-4 bg-opacity-60 bg-gray-800">
                    {/* UserDetails component */}
                    <div className="flex-1 h-full">
                        <UserDetails />
                    </div>

                    {/* Send1 component */}
                    <div className="flex-1 h-full">
                        <Send1 />
                    </div>
                </div>
            </div>
        </div>
    );
}
