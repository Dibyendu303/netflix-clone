import React, { useState } from 'react'
import "./LoginScreen.css"
import netflixLogo from "../images/Netflix_2015_logo.svg.png"
import SignInScreen from './SignInScreen';
const LoginScreen = () => {
    const [signIn, setSignIn] = useState(false);

    return (
        <div className='loginScreen'>
            <div className="loginScreen_background">
                <img src={netflixLogo} alt="" className="loginScreen__logo" />
                <button className="loginScreen__button">Sign in</button>
                <div className="loginScreen__gradient"></div>
            </div>
            <div className="loginScreen__body">
                {signIn ? <SignInScreen /> :
                    <>
                        <h1>Unlimited movies, TV shows and more.</h1>
                        <h2>Watch anywhere. Cancel at any time.</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <div className="loginScreen__input">
                            <form>
                                <input type="email" placeholder='Email address' />
                                <button type="button" className="loginScreen__getStarted" onClick={() => setSignIn(true)}>GET STARTED</button>
                            </form>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default LoginScreen