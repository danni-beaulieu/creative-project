import React, { useState, useEffect, useContext } from 'react'
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import jwt from './use_jwt';
import { AuthContext, useRefesh } from "./auth_context";
 
const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [cookies, setCookie] = useCookies(["userid", "customerid", "display"]);
    const [auth] = useContext(AuthContext);
    const [userid, customerid, display] = useRefesh();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await jwt.get('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/users', {
                    headers: {
                        Authorization: `Bearer ${auth}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.log("view_users.getUsers: " + error);
            }
        }
        if (auth) {
            const decoded = jwt_decode(auth);
            setCookie("userid", decoded.userid, { path: '/' });
            setCookie("customerid", decoded.customerid, { path: '/' });
            setCookie("display", decoded.display, { path: '/' });
            getUsers();
        }
    }, [auth, setCookie, userid, customerid, display]);
 
    return (
        <div className="container mt-5">
            <h1>Welcome Back: {cookies.display}</h1>
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