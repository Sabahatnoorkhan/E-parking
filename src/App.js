import './App.css';
import Login from './Components/Login.tsx';
import Register from './Components/Register.tsx';
import BookParking from './Components/BookParking/BookParking.tsx';
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
      </Routes>

      </div>
    </Router>
  );
}

export default App;
