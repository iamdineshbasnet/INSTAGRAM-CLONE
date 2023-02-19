import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import avatar from "../../Assets/profile.png";
import "./style.css";
const Signup = () => {
    // Import "useNavigate" hook to navigate to different page
    const navigate = useNavigate();

    // State to hold any error
    const [err, setErr] = useState(false);
    const [errValue, setErrValue] = useState("");

    // State to hold the file with a default value of null
    const [file, setFile] = useState(null);
    // State to hold the displayName, email and password of the user
    const [signUpUser, setSignUpUser] = useState({
        displayName: "",
        email: "",
        password: "",
    });

    // Destructuring "displayName", "email" and "password" from "signUpUser" state
    const { displayName, email, password } = signUpUser;

    // Function to handle file changes, updates the file state
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Function to handle changes in the displayName input field
    const handleDisplayName = ({ target: { value } }) => {
        setSignUpUser({ ...signUpUser, displayName: value });
    };

    // Function to handle changes in the email input field
    const handleEmail = ({ target: { value } }) => {
        setSignUpUser({ ...signUpUser, email: value });
    };

    // Function to handle changes in the password input field
    const handlePassword = ({ target: { value } }) => {
        setSignUpUser({ ...signUpUser, password: value });
    };

    // Function to handle the signup process
    const handleSignup = async (e) => {
        // Prevent form from submitting
        e.preventDefault();
        if (!file) {
            setErr(true);
            setErrValue("Choose an Avatar");
        } else if (!displayName) {
            setErr(true);
            setErrValue("choose a username");
        } else if (!email) {
            setErr(true);
            setErrValue("Invalid Email!");
        } else if (!password || password.length < 6) {
            setErr(true);
            setErrValue("Password must be at least 6 character");
        } else {
            try {
                // create a user with email and password
                const res = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                // create a unique image name
                const date = new Date().getTime();
                const storageRef = ref(storage, `${displayName + date}`);

                // Upload the selected file to the storage with a resumable upload
                await uploadBytesResumable(storageRef, file).then(() => {
                    // Get the download url of the uploaded file
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        try {
                            //Update the user profile with displayName and the downloadURL of the image
                            await updateProfile(res.user, {
                                displayName,
                                photoURL: downloadURL,
                            });
                            //create a document for user on firestore with user's details
                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL,
                                followers: 0,
                                following: 0,
                                posts_count: 0,
                                saved_count: 0,
                            });

                            //create empty user chats on firestore
                            await setDoc(
                                doc(db, "userChats", res.user.uid),
                                {}
                            );

                            // Navigate to "login" page, when user signup successfully
                            navigate("/login");
                        } catch (err) {
                            console.log('');
                        }
                    });
                });
                setErr(false);
            } catch (err) {
                // Setting the error state to true if an error occurs during the "signup" process
                setErr(true);
                setErrValue("Email Already in use");
            }
        }
    };

    // Event handler to navigate to the "login" page
    const handleNavigation = () => {
        navigate("/login");
    };
    return (
        <form className="signup_form" onSubmit={handleSignup}>
            <div className="signup_form_container">
                <h1>Instagram</h1>
                <input
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    type="file"
                    id="userAvatarImg"
                />
                <label htmlFor="userAvatarImg">
                    <img src={avatar} alt="" />
                </label>
                <div className="signup_form_input_container">
                    <div className="signup_form_group">
                        <input
                            onChange={handleDisplayName}
                            value={displayName}
                            type="text"
                            placeholder="Choose username"
                        />
                    </div>
                    <div className="signup_form_group">
                        <input
                            onChange={handleEmail}
                            value={email}
                            type="text"
                            placeholder="Phone number or email"
                        />
                    </div>
                    <div className="signup_form_group">
                        <input
                            onChange={handlePassword}
                            value={password}
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="form_signup_btn">
                        <button type="submit">Signup</button>
                    </div>
                    {!err ? (
                        ""
                    ) : (
                        <div className="display_signup_error">
                            <span>{errValue}</span>
                        </div>
                    )}
                    <div className="login_reference">
                        <h4>
                            Already have an account?
                            <strong onClick={handleNavigation}> Login</strong>
                        </h4>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Signup;
