import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
 
const CreateProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["userid"]);
 
    const saveProject = async (e) => {
        e.preventDefault();
        await axios.post('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/projects',{
            user_id: cookies.userid,
            title: title,
            description: description
        });
        navigate("/projects");
    }
 
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