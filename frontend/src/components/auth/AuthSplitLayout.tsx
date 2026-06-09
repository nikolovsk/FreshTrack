import type { ReactNode } from "react";
import "../../styles/auth.css";

interface Props {
    left: ReactNode;
    right: ReactNode;
}

function AuthSplitLayout({ left, right }: Props) {
    return (
        <div className="auth-split">
            <div className="auth-left">{left}</div>
            <div className="auth-right">{right}</div>
        </div>
    );
}

export default AuthSplitLayout;