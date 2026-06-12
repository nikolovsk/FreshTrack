import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar.tsx";

function AppLayout() {
    return (
        <div className="app-layout">
            <Navbar />

            <main className="app-content">
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;