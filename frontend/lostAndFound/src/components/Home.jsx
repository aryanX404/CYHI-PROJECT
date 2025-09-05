import React , {useState, useEffect, use} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, Outlet } from "react-router-dom";
import './Home.css'

export default function Home() {
    const { user, isAuthenticated } = useAuth0();
    const [userName , setUserName] = useState("Guest");
    const [picture , setPicture] = useState("");

    useEffect(()=>{
        if(isAuthenticated){
            setUserName(user.given_name);
            setPicture(user.picture);
        }
    },[isAuthenticated,])
    console.log(user)

  return (
    <>
    <div className="home-container">
        <div className="navbar">

            <div className="left">
                <div className="title">
                <div className="logo">Lost & Found IIITDMJ</div>
                <div className="tagline">Find it. Return it. Simple.</div>
            </div>
            <div className="left-nav">
                <NavLink to='dashboard' className="nav-item">Dashboard</NavLink>
                <NavLink to='postItem' className="nav-item">Found Item</NavLink>
                <NavLink to='lostitem' className="nav-item">Lost Item</NavLink>
                <NavLink to='myClaims'className="nav-item">My claims</NavLink>
            </div>
            </div>
            
            <div className="right">
                <div className="name">{userName}</div>
                <div className="picture">{picture && <img src={picture} alt="Profile" className="profile-img" />}</div>
            </div>
            
        </div>

        <div className="content-container">
            <Outlet />
        </div>
        
        </div>
    </>
    
  )
}
