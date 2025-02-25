import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import SearchComponent from "./components/SearchComponent/SearchUser.tsx";
import MainPage from "./components/SendComponent/MainPage.tsx";
import TransferMoney from "./components/SendComponent/TransferMoney.tsx";
import ProtectedRoute from "./components/ProtectedRoutes.tsx"; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Search"
          element={
            <ProtectedRoute>
              <SearchComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transfer"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/TransferMoney"
          element={
            <ProtectedRoute>
              <TransferMoney />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
