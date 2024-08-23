import './App.css';
import LoginComponent from './components/Auth';
import RegisterComponent from './components/Auth/RegisterComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Main from './components/Main/Main';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
