import { useAuth0 } from "@auth0/auth0-react";
import './login.css'
import React from "react";

const LoginButton = () => {
    
    const { user, loginWithRedirect,logout, isAuthenticated } = useAuth0();
    console.log("current user",user);


    return (
        <>
        <div className="login-container">

        {isAuthenticated? 
            <>
            <h1>hello {user.name}</h1>
            <button onClick={()=> logout()} >Log out</button>
            </>
        
        :
        <button onClick={() => loginWithRedirect({
            appState: { returnTo: "/" },
        })}>Log In</button>}
        </div>
        
        </>
    
)
};

export default LoginButton;