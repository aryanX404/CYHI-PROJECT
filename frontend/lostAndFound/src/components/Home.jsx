import React , {useState, useEffect, use} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, Outlet } from "react-router-dom";
import './Home.css'

export default function Home() {
    const { user, isAuthenticated } = useAuth0();
    const [userName , setUserName] = useState("Guest");

    useEffect(()=>{
        if(isAuthenticated){
            setUserName(user.given_name);
        }
    },[isAuthenticated])
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
                <NavLink to='myItems' className="nav-item">My Items</NavLink>
                <NavLink to='myClaims'className="nav-item">My claims</NavLink>
            </div>
            </div>
            
            {/* {isAuthenticated ? setUserName(user.name) : setUserName("Guest")} */}
            <div className="profile">{userName}</div>
        </div>

        <div className="content-container">
            <Outlet />
        </div>
        
        </div>
    </>
    
  )
}
