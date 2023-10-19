import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import { AuthContext } from "./contexts/AuthContext";
import Groups from "./components/Groups";
import Activity from './components/Activity'

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/Best_Team_Ever" />;
    //return currentUser ? children : <Navigate to="/login" />;
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
        path="/groups"
        element={
          <ProtectRoute>
            <Groups />
          </ProtectRoute>
        }
      />
      <Route
        path="/activity"
        element={
          <ProtectRoute>
            <Activity />
          </ProtectRoute>
        }
      />
      <Route
        path="Best_Team_Ever"
        element={currentUser ? <Navigate to="/" /> : <LoginPage />}
      />
    </Routes>
  );
}

export default App;
