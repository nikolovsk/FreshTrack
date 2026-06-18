function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-brand">
                    <div className="logo-text">
                        <span>Fresh</span>
                        <span className="logo-text-track">Track</span>
                    </div>

                    <p>
                        Helping households reduce food waste through smarter inventory tracking.
                    </p>

                    <div className="footer-badge">
                        Built for better food habits 🥦
                    </div>
                </div>

                <div className="footer-links">
                    <div className="footer-column">
                        <h4>App</h4>
                        <a href="/groceries">Groceries</a>
                        <a href="/recipes">Recipes</a>
                        <a href="/dashboard">Dashboard</a>
                    </div>

                    <div className="footer-column">
                        <h4>About</h4>
                        <a href="#home">Home</a>
                        <a href="#features">Features</a>
                        <a href="#mission">Mission</a>
                        <a href="#how-it-works">How it works</a>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} FreshTrack</p>
            </div>

        </footer>
    );
}

export default Footer;