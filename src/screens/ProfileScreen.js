import React from 'react'
import Navbar from '../components/Navbar'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux/es/exports'
import netflixAvatar from "../images/Netflix-avatar.png"
import { signOut, auth } from "../firebase"
import "./ProfileScreen.css"
import PlansScreen from './PlansScreen'

const ProfileScreen = () => {
    const user = useSelector(selectUser);
    return (
        <div className='profileScreen'>
            <Navbar />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src={netflixAvatar} alt="" />
                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen__plans">
                            <h3>Plans</h3>
                            <PlansScreen />
                            <button className="profileScreen__signOut" onClick={() => signOut(auth)}>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen