import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface Props {
    to: string;
    label: string;
    icon: LucideIcon;
    end?: boolean;
}

function NavItem({ to, label, icon: Icon, end }: Props) {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
            }
        >
            <Icon size={18} />
            <span>{label}</span>
        </NavLink>
    );
}

export default NavItem;