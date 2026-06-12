import  { type ReactNode } from "react";
import * as React from "react";

interface Props {
    children: ReactNode;
    onSubmit: (e: React.FormEvent) => void;
}

function AuthForm({ children, onSubmit }: Props) {
    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <div className="auth-fields">
                {children}
            </div>
        </form>
    );
}

export default AuthForm;