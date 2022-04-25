import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
 
    const Auth = async (e) => {
        e.preventDefault();
        console.log("posting to login...")
        try {
            await axios.post('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/login', {
                login: login,
                password: password
            });
            navigate("/projects");
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
                            <form onSubmit={Auth} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Username</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={login} onChange={(e) => setLogin(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Login