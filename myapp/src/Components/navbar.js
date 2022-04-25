import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
 
const Navbar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["userid", "customerid"]);
 
    const Logout = async () => {
        try {
            await axios.delete('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/logout');
            removeCookie("userid");
            removeCookie("customerid");
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="pngegg.png" width="85" height="85" alt="logo" />
                    </a>
 
                    <a onClick={() => {setIsActive(!isActive);}} role="button" 
                        className={`navbar-burger burger ${isActive ? "is-active" : ""}`} 
                        aria-label="menu" aria-expanded="false" data-target="my-nav">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                    </a>
                </div>
 
                <div id="my-nav" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
                    <div className="navbar-start">
                        <a href="/" className="navbar-item">
                            Home
                        </a>
                        <a href="/users" className="navbar-item">
                            Users
                        </a>
                        <a href="/donations" className="navbar-item">
                            Donations
                        </a>
                        <a href="/methods" className="navbar-item">
                            Account
                        </a>
                    </div>
 
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={Logout} className="button is-light">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar