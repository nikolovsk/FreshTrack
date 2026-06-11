import { useState } from "react";
import AuthSplitLayout from "../components/auth/AuthSplitLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthForm from "../components/auth/AuthForm";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { getErrorMessage } from "../utils/apiError.ts";
import { useAuth } from "../context/useAuth.ts";
import { Eye, EyeOff } from "lucide-react";
import AuthLeftPanel from "../components/auth/AuthLeftPanel.tsx";

function LoginPage() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await login({ email, password });
            loginUser(res.token);
            navigate("/");
        } catch(err: unknown) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthSplitLayout
            left={
                <AuthLeftPanel
                    title={"Know your food.\nBefore it goes to waste."}
                    description={"Everything in your kitchen, organized in one place.\nNo guessing. No forgotten groceries. No wasted food."}
                    tagline="Trusted by households for smarter food habits."
                />
            }
            right={
                <AuthCard
                    title="Welcome back"
                    subtitle="Sign in to continue"
                >
                    <AuthForm onSubmit={handleSubmit}>

                        <AuthInput
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <AuthInput
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            toggleElement={
                                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            }
                        />

                        <div className="auth-support">
                            {error && (
                                <p className="auth-error">{error}</p>
                            )}
                        </div>

                        <div className="auth-actions">
                            <AuthButton loading={loading}>
                                Sign in
                            </AuthButton>
                        </div>
                    </AuthForm>

                    <div className="auth-footer">
                        Don’t have an account?
                        <Link to="/register" className="auth-link">Create one</Link>
                    </div>
                </AuthCard>
            }
        />
    );
}

export default LoginPage;