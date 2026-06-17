import { Link } from "react-router-dom";
import GroceriesAnimation from "../GroceriesAnimation.tsx";
import groceriesAnimation from "../../assets/grabGroceries.json";
import { ArrowRight } from "lucide-react";

function HeroSection() {
    return (
        <section id="home" className="home-hero">

            <div className="text-section">
                <div className="home-hero-text">
                    <h1>
                        Track your food.<br />
                        Before it goes to waste.
                    </h1>

                    <p>
                        Track groceries, monitor expiration dates,<br />
                        discover recipes from ingredients you already own,<br />
                        and build smarter food habits.
                    </p>

                    <div className="home-hero-actions">
                        <Link to="/groceries" className="btn primary">
                            Open Inventory
                            <ArrowRight size={18} />
                        </Link>

                        <Link to="/dashboard" className="btn secondary">
                            View Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            <div className="home-hero-visual-wrapper">
                <GroceriesAnimation className="hero-visual" animationData={groceriesAnimation} speed={0.7} />
            </div>

        </section>
    );
}

export default HeroSection;