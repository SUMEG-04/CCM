import { useState } from "react";
import Button from "../../common/Button/Button";
import Container from "../../common/Container/Container";
import CommonInput from "../../common/Input/CommonInput";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/apiService";
import { withCCMStore } from "../../store/withCCMStore";

const LoginComponent = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [login, { isLoading }] = useLoginMutation();

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === "username") {
            setUserName(value);
        } else {
            setPassword(value);
        }
    };

    const handleSubmit = async () => {
        if (!userName.trim() || !password.trim()) {
            setErrorMessage("Please fill in both username and password.");
            return;
        }

        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const response = await login({
                username: userName.trim(),
                password: password.trim()
            }).unwrap();

            setSuccessMessage(response.message || "Login successful!");
            window.dispatchEvent(new Event("ccm_auth_change"));
            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (err: any) {
            const message = err?.data?.error || err?.data?.message || "Invalid username or password";
            setErrorMessage(message);
        }
    };

    return (
        <Container>
            <div className="login-container">
                <div className="login-header">
                    <p className="login-heading">Login</p>
                </div>
                {errorMessage && (
                    <div style={{ color: "#d32f2f", backgroundColor: "#ffebee", padding: "8px 12px", borderRadius: "4px", margin: "8px 0", fontSize: "14px" }}>
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div style={{ color: "#2e7d32", backgroundColor: "#e8f5e9", padding: "8px 12px", borderRadius: "4px", margin: "8px 0", fontSize: "14px" }}>
                        {successMessage}
                    </div>
                )}
                <div className="login-body">
                    <CommonInput 
                        label="Username"  
                        name="username"   
                        value={userName} 
                        onChange={handleChange} 
                        placeholder="username" 
                        type="text"
                    />
                    <CommonInput 
                        label="Password" 
                        name="password" 
                        value={password} 
                        onChange={handleChange} 
                        placeholder="password" 
                        type="password"
                    />
                </div>
                <div className="login-footer">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                    <Button label={isLoading ? "Logging in..." : "Login"} onClick={handleSubmit} sx={{}} />
                </div>
            </div>
        </Container>
    );
};

const Login = withCCMStore(LoginComponent);
export default Login;
