import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
    title: string;
    description: string;
    actionText: string;
    actionPath: string;
    icon: LucideIcon;
}

function FeatureCard({ title, description, actionText, actionPath, icon: Icon }: Props) {
    return (
        <div className="feature-card">

            <div className="feature-icon">
                <Icon size={32} />
            </div>

            <div className="feature-content">
                <h3>{title}</h3>

                <p>{description}</p>
            </div>

            <Link to={actionPath} className="feature-link">
                {actionText}
                <ArrowRight size={18} />
            </Link>

        </div>
    );
}

export default FeatureCard;