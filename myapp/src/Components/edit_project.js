import { useState, useEffect, useContext } from 'react'
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import jwt from './use_jwt';
import { AuthContext, useRefesh } from "./auth_context";
 
const EditProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [cookies, setCookie] = useCookies(["userid", "customerid", "display"]);
    const [auth] = useContext(AuthContext);
    const [userid, customerid, display] = useRefesh();
 
    const updateProject = async (e) => {
        e.preventDefault();
        const response = await jwt.patch(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/projects/${id}`,{
            title: title,
            description: description
        }, { headers: {
            Authorization: `Bearer ${auth}`
        }});
        console.log(JSON.stringify(response.data));
        navigate("/projects");
    }

    useEffect(() => {
        if (auth) {
            const decoded = jwt_decode(auth);
            setCookie("userid", decoded.userid, { path: '/' });
            setCookie("customerid", decoded.customerid, { path: '/' });
            setCookie("display", decoded.display, { path: '/' });
        }
    }, [auth, setCookie, userid, customerid, display]);
 
    useEffect(() => {
        getProjectById();
    }, []);
 
    const getProjectById = async () => {
        const response = await jwt.get(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        });
        console.log(JSON.stringify(response.data));
        setTitle(response.data.title);
        setDescription(response.data.description);
    }
 
    return (
        <div className="container">
        <div className="columns">
        <div className="column is-half is-offset-one-quarter">
        <div>
            <form onSubmit={ updateProject }>
                <div className="field">
                    <label className="label">Title</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Title"
                        value={ title }
                        onChange={ (e) => setTitle(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Description</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Description"
                        value={ description }
                        onChange={ (e) => setDescription(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <button className="button is-primary">Update</button>
                </div>
            </form>
        </div>
        </div>
        </div>
        </div>
    )
}
 
export default EditProject