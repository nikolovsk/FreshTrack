import { BarChart3, ShoppingBasket, UtensilsCrossed } from "lucide-react";
import FeatureCard from "./FeatureCard.tsx";

function FeatureSection() {
    return (
        <section className="home-features">

            <FeatureCard
                title="Manage Your Inventory"
                description="Keep all your groceries organized in one place, monitor expiration dates, and always know what needs to be used next."
                actionText="Open Inventory"
                actionPath="/groceries"
                icon={ShoppingBasket}
            />

            <FeatureCard
                title="Cook With What You Have"
                description="Discover recipe ideas based on ingredients already in your kitchen and make the most of food before it expires."
                actionText="Explore Recipes"
                actionPath="/recipes"
                icon={UtensilsCrossed}
            />

            <FeatureCard
                title="Understand Your Habits"
                description="Visualize food waste, track consumption patterns, and gain insights that help you build smarter shopping habits."
                actionText="View Dashboard"
                actionPath="/dashboard"
                icon={BarChart3}
            />

        </section>
    );
}

export default FeatureSection;