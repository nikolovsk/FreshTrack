import GroceriesAnimation from "../GroceriesAnimation.tsx";

interface Props {
    title: string;
    description: string;
    tagline: string;
}

function AuthLeftPanel({ title, description, tagline}: Props) {
    return (
        <div>
            <div className="auth-brand">
                <div className="auth-logo-dot" />
                <span>FreshTrack</span>
            </div>

            <h1 className="auth-hero-title">
                {title}
            </h1>

            <p className="auth-hero-text">
                {description}
            </p>

            <div className="auth-visual-stage">
                <GroceriesAnimation />
            </div>

            <div className="auth-tagline">
                {tagline}
            </div>
        </div>
    )
}

export default AuthLeftPanel;