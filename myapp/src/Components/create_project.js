import { useState, useEffect, useContext  } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import jwt from './use_jwt';
import { AuthContext, useRefesh } from "./auth_context";
 
const CreateProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["userid", "customerid", "display"]);
    const [auth] = useContext(AuthContext);
    const [userid, customerid, display] = useRefesh();
 
    const saveProject = async (e) => {
        e.preventDefault();
        await jwt.post('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/projects',{
            user_id: cookies.userid,
            title: title,
            description: description
        }, { headers: {
            Authorization: `Bearer ${auth}`
        }});
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
 
    return (
        <div className="container">
        <div className="columns">
        <div className="column is-half is-offset-one-quarter">
        <div>
            <form onSubmit={ saveProject }>
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
                    <button className="button is-primary">Save</button>
                </div>
            </form>
        </div>
        </div>
        </div>
        </div>
    )
}
 
export default CreateProject