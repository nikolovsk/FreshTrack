import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.ts";

import { LogOut } from "lucide-react";
import Logo from "./Logo.tsx";
import { navItems } from "./navItems.ts";
import NavItem from "./NavItem.tsx";

function Navbar() {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <Logo />

            <div className="navbar-center">
                {navItems.map((item) => (
                    <NavItem
                        key={item.path}
                        to={item.path}
                        label={item.label}
                        icon={item.icon}
                        end={item.end}
                    />
                ))}
            </div>

            <div className="navbar-right">
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>

        </nav>
    );
}

export default Navbar;