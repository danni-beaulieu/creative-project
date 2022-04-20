/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
 
const Dashboard = () => {
    const [display, setDisplay] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
 
    useEffect(() => {
        refreshToken();
        // getUsers();

        // // Add inner async function
        // const fetchUsers = async () => {
        //     try {
        //         await refreshToken();
        //         await getUsers();
        //     } catch (error) {
        //         console.log("dashboard.useEffect: " + error);
        //     }
        // }
    
        // // Call function immediately
        // fetchUsers()
    }, []);

    useEffect(() => {
        // this will be triggered whenever token will be updated
        console.log('dashboard.useEffect getting users... ', token);
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
            setDisplay(decoded.display);
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
            setDisplay(decoded.display);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
 
    const getUsers = async () => {
        try {
            console.log("dashboard.getUsers token: " + token);
            const response = await axiosJWT.get('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("dashboard.getUsers users: " + JSON.stringify(response.data));
            setUsers(response.data);
        } catch (error) {
            console.log("dashboard.getUsers: " + error);
        }
    }
 
    return (
        <div className="container mt-5">
            <h1>Welcome Back: {display}</h1>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Login Name</th>
                        <th>Display Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.login_name}</td>
                            <td>{user.display_name}</td>
                        </tr>
                    ))}
 
                </tbody>
            </table>
        </div>
    )
}
 
export default Dashboard