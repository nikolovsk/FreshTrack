import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

function App() {
  return (
      <Routes>
          <Route path="/login" element={ <LoginPage /> } />

          <Route path="/register" element={ <RegisterPage /> } />

          <Route path="/" element={
                  <ProtectedRoute>
                      <HomePage />
                  </ProtectedRoute>
          } />
      </Routes>
  );
}

export default App;