function HowItWorksSection() {
    return (
        <section className="home-how-it-works">

            <div className="how-header">
                <h2>How FreshTrack works</h2>
                <p>
                    A simple flow that turns your groceries into a structured, actionable system.
                </p>
            </div>

            <div className="how-timeline">

                <div className="how-step">
                    <div className="step-marker">
                        <div className="step-circle">1</div>
                        <div className="step-dot" />
                    </div>

                    <div className="step-content">
                        <h3>Add your groceries</h3>
                        <p>Quickly log what you buy or already have at home.</p>
                    </div>
                </div>

                <div className="how-step">
                    <div className="step-marker">
                        <div className="step-circle">2</div>
                        <div className="step-dot" />
                    </div>

                    <div className="step-content">
                        <h3>Track expiration dates</h3>
                        <p>FreshTrack highlights what needs attention first.</p>
                    </div>
                </div>

                <div className="how-step">
                    <div className="step-marker">
                        <div className="step-circle">3</div>
                        <div className="step-dot" />
                    </div>

                    <div className="step-content">
                        <h3>Get recipe suggestions</h3>
                        <p>Turn expiring items into meal ideas instantly.</p>
                    </div>
                </div>

                <div className="how-step">
                    <div className="step-marker">
                        <div className="step-circle">4</div>
                        <div className="step-dot" />
                    </div>

                    <div className="step-content">
                        <h3>Reduce waste & save money</h3>
                        <p>Build smarter habits over time without effort.</p>
                    </div>
                </div>

            </div>

        </section>
    );
}

export default HowItWorksSection;