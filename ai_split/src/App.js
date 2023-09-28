import './App.css';
import db from './firebase'
import { Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage'

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
