import "../../styles/auth.css";
import * as React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

function AuthInput({ label, ...props }: Props) {
    return (
        <div className="auth-field">
            <label className="auth-label">{label}</label>
            <input className="auth-input" {...props} />
        </div>
    );
}

export default AuthInput;