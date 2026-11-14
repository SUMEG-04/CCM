import { useState } from "react";
import Button from "../../common/Button/Button";
import CommonInput from "../../common/Input/CommonInput";
import Container from "../../common/Container/Container";
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../services/apiService";
import { withCCMStore } from "../../store/withCCMStore";

const RegisterComponent = () => {
    const navigate = useNavigate();
    const [signupDetails, setSignUpDetails] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [register, { isLoading }] = useRegisterMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (!signupDetails.username.trim() || !signupDetails.email.trim() || !signupDetails.password.trim()) {
            setErrorMessage("Username, Email, and Password are required.");
            return;
        }

        if (signupDetails.password !== signupDetails.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (signupDetails.password.length < 6) {
            setErrorMessage("Password must be at least 6 characters.");
            return;
        }

        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const response = await register({
                username: signupDetails.username.trim(),
                firstname: signupDetails.firstname.trim(),
                lastname: signupDetails.lastname.trim(),
                email: signupDetails.email.trim(),
                password: signupDetails.password,
                confirmPassword: signupDetails.confirmPassword
            }).unwrap();

            setSuccessMessage(response.message || "Registration successful!");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err: any) {
            const message = err?.data?.error || err?.data?.message || "Registration failed. Please try again.";
            setErrorMessage(message);
        }
    };

    return (
        <Container>
            <div className="signup-container">
                <div className="signup-header">
                    <p className="signup-heading">Register</p>
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
                <div className="signup-body">
                    <CommonInput
                        label="Username"  
                        name="username"   
                        value={signupDetails.username} 
                        onChange={handleChange} 
                        placeholder="username" 
                        type="text"
                    />
                    <CommonInput
                        label="First Name"
                        name="firstname"
                        value={signupDetails.firstname}
                        onChange={handleChange}
                        placeholder="firstname"
                        type="text"
                    />
                    <CommonInput
                        label="Last Name"
                        name="lastname"
                        value={signupDetails.lastname}
                        onChange={handleChange}
                        placeholder="lastname"
                        type="text"
                    />
                    <CommonInput
                        label="Email"  
                        name="email"   
                        value={signupDetails.email}
                        onChange={handleChange} 
                        placeholder="email" 
                        type="text"
                    />
                    <CommonInput 
                        label="Password" 
                        name="password" 
                        value={signupDetails.password} 
                        onChange={handleChange} 
                        placeholder="password" 
                        type="password"
                    />
                    <CommonInput 
                        label="Confirm Password" 
                        name="confirmPassword" 
                        value={signupDetails.confirmPassword} 
                        onChange={handleChange} 
                        placeholder="confirm password" 
                        type="password"
                    />
                </div>
                <div className="signup-footer">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                    <Button
                        label={isLoading ? "Registering..." : "Register"} 
                        onClick={handleSubmit} 
                    />
                </div>
            </div>
        </Container>
    );
};

const Register = withCCMStore(RegisterComponent);
export default Register;
