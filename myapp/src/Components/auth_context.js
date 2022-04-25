import React, { useContext, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function useRefesh() {
    const navigate = useNavigate();
    const [auth, setAuth] = useContext(AuthContext);

    async function RefreshToken() {
        try {
            console.log("auth_context.refreshToken... ");
            const response = await axios.get('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/token');
            setAuth(response.data.token);
        } catch (error) {
            console.log("auth_context.refreshToken error:" + error);
            if (error.response) {
                navigate("/");
            }
        }
    } 

    useEffect(() => {
        console.log('auth_context.useEffect refreshing token... ');
        RefreshToken();
    }, []);  

    return [auth];
}

export const AuthContext = React.createContext();
export {useRefesh};