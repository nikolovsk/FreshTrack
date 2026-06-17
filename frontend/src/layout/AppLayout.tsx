import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.tsx";
import Footer from "../components/footer/Footer.tsx";

function AppLayout() {
    return (
        <div className="app-layout">
            <Navbar />

            <main className="app-content">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default AppLayout;