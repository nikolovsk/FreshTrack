import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import GroceriesPage from "./pages/GroceriesPage.tsx";

function App() {
  return (
      <Routes>
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />

          <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/groceries" element={ <GroceriesPage /> } />
              </Route>
          </Route>
      </Routes>
  );
}

export default App;