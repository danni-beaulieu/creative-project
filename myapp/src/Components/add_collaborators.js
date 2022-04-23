import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

const AddCollaborator = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [msg, setMsg] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [collaboratorid, setCollaboratorID] = useState('1');
    const [cookies, setCookie, removeCookie] = useCookies(["userid", "customerid"]);
 
    useEffect(() => {
        refreshToken();
    }, []);

    useEffect(() => {
        // this will be triggered whenever token will be updated
        console.log('add_collaborators.useEffect getting users... ', token);
        if (token) {
            getUsers();
        }
      }, [token]);

    const refreshToken = async () => {
        console.log("dashboard.refreshToken... ");
        try {
            const response = await axios.get('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/token');
            console.log("dashboard.refreshToken response.data:" + JSON.stringify(response.data));
            setToken(response.data.token);
            console.log("dashboard.refreshToken token set:" + token);
            const decoded = jwt_decode(response.data.token);
            console.log("dashboard.refreshToken decoded:" + JSON.stringify(decoded));
            setCookie("userid", decoded.userid, { path: '/' });
            setCookie("customerid", decoded.customerid, { path: '/' });
            console.log("dashboard.refreshToken cookie: (uid) " + cookies.userid + " (cid) " + cookies.customerid);
            setExpire(decoded.exp);
        } catch (error) {
            console.log("dashboard.refreshToken error:" + error);
            if (error.response) {
                navigate("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/token');
            console.log("dashboard response.data:" + JSON.stringify(response.data));
            config.headers.Authorization = `Bearer ${response.data.token}`;
            setToken(response.data.token);
            console.log("dashboard token set:" + token);
            const decoded = jwt_decode(response.data.token);
            console.log("dashboard decoded: " + JSON.stringify(decoded));
            setCookie("userid", decoded.userid, { path: '/' });
            setCookie("customerid", decoded.customerid, { path: '/' });
            console.log("dashboard cookie: (uid) " + cookies.userid + " (cid) " + cookies.customerid);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        try {
            console.log("add_collaborators.getUsers token: " + token);
            const response = await axiosJWT.get('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("add_collaborators.getUsers users: " + JSON.stringify(response.data));
            setUsers(response.data);
        } catch (error) {
            console.log("add_collaborators.getUsers: " + error);
        }
    }

    const addCollaborator = async (e) => {
        e.preventDefault();
        console.log(collaboratorid);
        try {
            await axios.post('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/collaborators', {
                project_id: id,
                collaborator_id: collaboratorid
            });
            console.log("Successful add!")
            navigate("/projects");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.message);
            }
        }
        console.log("adding collaborator...");
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={addCollaborator} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <select value={collaboratorid} onChange={(e) => setCollaboratorID(e.target.value)}>
                                        {users.map((user) => (
                                            <option value={user.id} key={user.id}>{user.login_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default AddCollaborator