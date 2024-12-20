import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ItemsList from "./components/ItemsList";
import ItemDetails from "./components/ItemDetails";
import Bookings from "./pages/Bookings";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import Feedback from "./pages/Feedback";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/items/:id" element={<ItemDetails />} />

        
        <Route path="/itemslist" element={<ItemsList />} />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/feedback" element={<Feedback />} />

      </Routes>
    </div>
  );
}

export default App;
