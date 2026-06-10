import "../../styles/auth.css";
import * as React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    toggleElement?: React.ReactNode;
}

function AuthInput({ label, toggleElement, ...props }: Props) {
    return (
        <div className="auth-field">
            <label className="auth-label">{label}</label>

            <div className="auth-input-wrapper">
                <input className="auth-input" {...props} />

                {toggleElement && (
                    <div className="auth-input-action">
                        {toggleElement}
                    </div>
                )}
            </div>

        </div>
    );
}

export default AuthInput;