import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
 
const EditProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
 
    const updateProject = async (e) => {
        e.preventDefault();
        const response = await axios.patch(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/projects/${id}`,{
            title: title,
            description: description
        });
        console.log(JSON.stringify(response.data));
        navigate("/projects");
    }
 
    useEffect(() => {
        getProjectById();
    }, []);
 
    const getProjectById = async () => {
        const response = await axios.get(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/projects/${id}`);
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