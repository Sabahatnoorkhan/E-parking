import './App.css';
import Login from './Components/Login.tsx';
import Register from './Components/Register.tsx';
import BookingHistory from './Components/Driver/BookParking/BookingHistory.tsx'
import OwnerLocation from './Components/Owner/AddedLocations.tsx'
import BookParking from './Components/Driver/BookParking/BookParking.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.tsx';


function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
            path="/ownerLocations"
            element={
              <PrivateRoute>
                <OwnerLocation />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
