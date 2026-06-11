import { useState } from "react";
import AuthSplitLayout from "../components/auth/AuthSplitLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthForm from "../components/auth/AuthForm";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

import { register } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { getErrorMessage } from "../utils/apiError.ts";
import { Eye, EyeOff, LucideCheckCircle } from "lucide-react";
import AuthLeftPanel from "../components/auth/AuthLeftPanel.tsx";

function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await register({ name, email, password });

            setSuccess(true);

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err: unknown) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthSplitLayout
                left={
                    <AuthLeftPanel
                        title={"Start tracking your food.\nBefore it goes to waste."}
                        description={"Create your account and bring clarity to your kitchen.\nTrack groceries, reduce waste, and build smarter habits."}
                        tagline="A smarter kitchen starts here."
                    />
                }
                right={
                    <AuthCard
                        title="Create account"
                        subtitle="Start your journey with FreshTrack"
                    >
                        <AuthForm onSubmit={handleSubmit}>

                            <AuthInput
                                label="Full Name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

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

                            <AuthInput
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                toggleElement={
                                    <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
                                    Create account
                                </AuthButton>
                            </div>
                        </AuthForm>

                        <div className="auth-footer">
                            Already have an account?
                            <Link to="/login" className="auth-link">Sign in</Link>
                        </div>
                    </AuthCard>
                }
            />

            {success && (
                <div className="success-modal-overlay">
                    <div className="success-modal">
                        <div className="success-icon">
                            <LucideCheckCircle />
                        </div>

                        <h3>Account created successfully</h3>

                        <p>
                            Your FreshTrack account is ready!
                            Redirecting you to sign in...
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default RegisterPage;