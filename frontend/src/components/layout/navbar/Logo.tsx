import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link to="/" className="navbar-logo">
            <div>
                <img className="logo-pic" src={logo} alt="logo"/>
            </div>
            <div className="logo-text">
                <span>Fresh</span>
                <span className="logo-text-track">Track</span>
            </div>
        </Link>
    );
}

export default Logo;