import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/Best_Team_Ever/" />;
  };

  return (
    <Routes>
      <Route
        path="/signup"
        element={currentUser ? <Navigate to="/" /> : <SignupPage />}
      />
      <Route
        path="/"
        element={
          <ProtectRoute>
            <HomePage />
          </ProtectRoute>
        }
      />
      <Route
        path="/login/"
        element={currentUser ? <Navigate to="/" /> : <LoginPage />}
      />
    </Routes>
  );
}

export default App;
