import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Home";
import { LoginPage } from "./pages/Auth";
import AuthWrapper from "./components/AuthWrapper";
import AppWrapper from "./components/AppWrapper";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route element={<AppWrapper />}>
            <Route path="/" element={<DashboardPage />} />
          </Route>

          <Route element={<AuthWrapper />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
