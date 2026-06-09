import type { ReactNode } from "react";
import "../../styles/auth.css";

interface Props {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

function AuthCard({ children, title, subtitle }: Props) {
    return (
        <div className="auth-card">
            <div className="auth-header">

                <h1 className="auth-title">{title}</h1>

                {subtitle && (
                    <p className="auth-subtitle">{subtitle}</p>
                )}
            </div>

            <div className="auth-body">
                {children}
            </div>
        </div>
    );
}

export default AuthCard;