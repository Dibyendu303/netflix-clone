import React, { useRef } from 'react'
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase";

import "./SignInScreen.css"

const SignInScreen = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential);
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    alert("Email already in use. Sign In to your account");
                }
                else {
                    alert("Please enter a valid email address");
                }
            });
    }
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                    alert("Invalid email or password");
                }
            });
    }
    return (
        <div className='signInScreen'>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" placeholder='Email' />
                <input ref={passwordRef} type="password" placeholder='Password' />
                <button type='submit' className='signInScreen__signIn' onClick={signIn}>Sign In</button>

                <h4><span className='signInScreen__gray'>New to Netflix?</span> <span className='signInScreen__link' onClick={register}>Sign up now.</span></h4>
            </form>
        </div>
    )
}

export default SignInScreen