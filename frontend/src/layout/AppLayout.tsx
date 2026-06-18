import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/navbar/Navbar.tsx";
import Footer from "../components/layout/footer/Footer.tsx";

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