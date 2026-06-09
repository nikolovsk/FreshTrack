import "../../styles/auth.css";
import * as React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

function AuthButton({ loading, children, ...props }: Props) {
    return (
        <button className="auth-button" disabled={ loading || props.disabled } {...props}>
            { loading ? "Loading..." : children }
        </button>
    );
}

export default AuthButton;