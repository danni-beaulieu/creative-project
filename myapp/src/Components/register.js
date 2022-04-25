import React, { useState } from 'react'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
 
const Register = () => {
    const [display, setDisplay] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
 
    const Register = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/users', {
                display: display,
                password: password,
                confPassword: confPassword
            });
            setLogin(response.data.login);
            console.log("Successful register!")
            // navigate("/login");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
 
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Register} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <p className="has-text-centered">{login}</p>
                                <div className="field mt-5">
                                    <label className="label">Display Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Display Name" value={display} onChange={(e) => setDisplay(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                                <Link to={`/login`} className="button is-fullwidth is-link">Login</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Register