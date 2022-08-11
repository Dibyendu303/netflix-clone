import React, { useEffect, useState } from 'react'
import netflixLogo from "../images/Netflix_2015_logo.svg.png"
import netflixAvatar from "../images/Netflix-avatar.png"
import { useNavigate } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    const [show, handleShow] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100)
                handleShow(true);
            else
                handleShow(false);
            return () => {
                window.removeEventListener("scroll");
            }
        })
    }, []);
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img src={netflixLogo} alt="Netflix Logo" className="nav__logo" onClick={() => navigate("/")} />
            <img src={netflixAvatar} alt="Profile Avatar" className="nav__avatar" onClick={() => navigate("../profile")} />
        </div >
    )
}

export default Navbar