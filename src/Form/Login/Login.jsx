import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./style.css";
const Login = () => {
    // Importing "useNavigate" hook to navigate to different pages
    const navigate = useNavigate();

    // state to hold any error
    const [err, setErr] = useState(false);

    // state to hold the email and password of the user trying to login
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: "",
    });

    // Destructuring "email" and "password" from the "loginUser" state
    const { email, password } = loginUser;

    // Event handler to update the email value in the "loginUser" state
    const handleEmail = ({ target: { value } }) => {
        setLoginUser({ ...loginUser, email: value });
    };

    // Event handler to update the password value in the "loginUser" state
    const handlePassword = ({ target: { value } }) => {
        setLoginUser({ ...loginUser, password: value });
    };


    // Event handler to login the user using the email and password
    const handleLogin = async (e) => {
        // prevent form from submission
        e.preventDefault();
        try {
            // Calling the "signInWithEmailAndPassword" function from the authentication library to login the user
            await signInWithEmailAndPassword(auth, email, password);
            // Navigate to "Homepage" after successful login
            navigate("/");
        } catch (err) {
            // Setting the error state to true if an error occurs during login process
            setErr(true);
        }
    };

    // Event handler to send password reset email to the user
    const handleForgotPassword = () => {
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert("password reset email has been sent to your email")
        })
        .catch((err)=>alert(err.messsage))
    };

    // Event handler to navigate to "signUp" page
    const handleNavigation = () => {
        navigate("/signup");
    };
    return (
        <div className="login_form">
            <div className="form_container">
                <h1>Instagram</h1>
                <form
                    className="login_form_input_container"
                    onSubmit={handleLogin}>
                    <div className="login_form_group">
                        <input
                            onChange={handleEmail}
                            value={email}
                            type="text"
                            placeholder="Phone number, email or username"
                        />
                    </div>
                    <div className="login_form_group">
                        <input
                            onChange={handlePassword}
                            value={password}
                            type="password"
                            placeholder="Password"
                        />
                        <div className="forgot_password">
                            <h4 onClick={handleForgotPassword}>
                                forgot password?
                            </h4>
                        </div>
                    </div>
                    <div className="form_login_btn">
                        <button type="submit">Login</button>
                    </div>
                </form>
                {err && <span>Something went wrong</span>}
                <div className="signup_reference">
                    <h4>
                        Don't have an account?{" "}
                        <strong onClick={handleNavigation}>Sign up</strong>
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default Login;
