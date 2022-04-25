import axios from 'axios';    
import { useContext } from 'react';
import { AuthContext } from "./auth_context";
import jwt_decode from "jwt-decode";

const axiosJWT = axios.create();
 
axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    const [auth, setAuth] = useContext(AuthContext);
    const decoded = jwt_decode(auth);

    if (decoded.exp * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/token');
        config.headers.Authorization = `Bearer ${response.data.token}`;
        setAuth(response.data.token);
    }
    return config;
}, (error) => {
    console.log("use_jwt interceptor error:" + error);
    return Promise.reject(error);
});

const jwt =  {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
};

export default jwt;