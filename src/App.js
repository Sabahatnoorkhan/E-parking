import "./App.css";
import Login from "./Components/Login.tsx";
import Register from "./Components/Register.tsx";
import BookingHistory from "./Components/Driver/BookParking/BookingHistory.tsx";
import OwnerLocation from "./Components/Owner/AddedLocations.tsx";
import Vehicles from "./Components/Driver/Vehicles/index.tsx";
import BookParking from "./Components/Driver/BookParking/BookParking.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.tsx";
import { useAuth } from "./AuthContext.tsx";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Conditional private routes based on user role */}
          {user?.role === "driver" ? (
            <>
              <Route
                path="/bookParking"
                element={
                  <PrivateRoute>
                    <BookParking />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bookingHistory"
                element={
                  <PrivateRoute>
                    <BookingHistory />
                  </PrivateRoute>
                }
              />
              <Route
                path="/vehicles"
                element={
                  <PrivateRoute>
                    <Vehicles />
                  </PrivateRoute>
                }
              />
            </>
          ) : user ? (
            <Route
              path="/ownerLocations"
              element={
                <PrivateRoute>
                  <OwnerLocation />
                </PrivateRoute>
              }
            />
          ) : null}

          {/* Default route: Redirect to /login or a protected route based on user role */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

