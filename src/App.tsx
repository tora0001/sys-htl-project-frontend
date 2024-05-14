import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import "./App.css";
import HotelHomePage from "./Components/HomepageComponent.tsx";
import BookRoom from "./Components/BookingComponent";
import CancelReservation from "./Components/CancelComponent";

export default function App() {
    return (
        <Router>
            <div className="outer-div-style">
                <div className="header-style">
                    <h1>HTL HOTEL</h1>
                </div>
                <nav className="nav-style">
                    <NavLink to="/home" className={({ isActive }) => isActive ? "button-active" : ""}>
                        <button>Homepage</button>
                    </NavLink>
                    <NavLink to="/book" className={({ isActive }) => isActive ? "button-active" : ""}>
                        <button>Book Hotel Room</button>
                    </NavLink>
                    <NavLink to="/cancel" className={({ isActive }) => isActive ? "button-active" : ""}>
                        <button>Cancel Booking</button>
                    </NavLink>
                </nav>
                <div className="content-style">
                    <Routes>
                        <Route path="/home" element={<HotelHomePage />} />
                        <Route path="/book" element={<BookRoom />} />
                        <Route path="/cancel" element={<CancelReservation />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
