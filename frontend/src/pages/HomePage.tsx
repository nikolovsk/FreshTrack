import HeroSection from "../components/home/HeroSection.tsx";
import FeatureSection from "../components/home/FeatureSection.tsx";
import MissionSection from "../components/home/MissionSection.tsx";
import HowItWorksSection from "../components/home/HowItWorksSection.tsx";

function HomePage() {
    return (
        <div className="home-page">

            <HeroSection />

            <hr />

            <section className="home-section-header">
                <h2>Everything you need to manage food smarter</h2>

                <p>
                    FreshTrack helps you stay organized, reduce waste, and
                    make better decisions about the food you buy and consume.
                </p>
            </section>

            <FeatureSection />

            <hr/>

            <MissionSection />

            <hr />

            <HowItWorksSection />
        </div>
    );
}

export default HomePage;