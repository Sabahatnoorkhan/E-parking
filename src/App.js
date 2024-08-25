import './App.css';
import Login from './Components/Login.tsx';
import Register from './Components/Register.tsx';
import BookingHistory from './Components/Driver/BookingHistory.tsx'
import OwnerLocation from './Components/Owner/AddedLocations.tsx'
import BookParking from './Components/Driver/BookParking/BookParking.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/bookParking" element={<BookParking/>} />
          <Route path="/bookingHistory" element={<BookingHistory/>} />
          <Route path="/ownerLocations" element={<OwnerLocation/>} />
      </Routes>

      </div>
    </Router>
  );
}

export default App;
