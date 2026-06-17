function MissionSection() {
    return (
        <section id="mission" className="home-mission">

            <div className="mission-wrapper">
                <div className="mission-top">

                    <div className="mission-content">
                        <span className="mission-label">Our Mission</span>

                        <h2>
                            Food waste starts quietly — in forgotten groceries.
                        </h2>

                        <p>
                            FreshTrack is designed to make your food inventory visible and actionable.
                            It helps you understand what you have, what is expiring soon,
                            and what to use next - without guesswork.
                        </p>

                    </div>

                    <div className="mission-impact">
                        <div className="floating-food food-1">🥦</div>
                        <div className="floating-food food-2">🍎</div>
                        <div className="floating-food food-3">🥕</div>

                        <div className="impact-number">30%</div>
                        <div className="impact-text">
                            of all food produced globally is wasted every year
                        </div>
                    </div>

                </div>

                <div className="mission-bottom">

                    <div className="mission-story problem">
                        <div className="story-tag">Problem</div>

                        <h3>Food gets forgotten easily</h3>

                        <p>
                            Most food waste doesn’t come from overbuying -
                            it comes from losing track of what’s already in your kitchen.
                        </p>
                    </div>

                    <div className="mission-story solution">
                        <div className="story-tag">Solution</div>

                        <h3>A simple, always-visible inventory</h3>

                        <p>
                            FreshTrack keeps your groceries organized and time-aware,
                            so you always know what to use before it goes bad.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default MissionSection;