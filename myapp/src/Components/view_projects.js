import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
 
const ViewProjects = () => {
    const [projects, setProject] = useState([]);
 
    useEffect(() => {
        getProjects();
    }, []);
 
    const getProjects = async () => {
        const response = await axios.get('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/projects');
        setProject(response.data);
    }
 
    const deleteProject = async (id) => {
        await axios.delete(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/projects/${id}`);
        getProjects();
    }
 
    return (
        <div>
            <Link to="/projects/create" className="button is-primary mt-2">Create</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { projects.map((project, index) => (
                        <tr key={ project.id }>
                            <td>{ index + 1 }</td>
                            <td>{ project.title }</td>
                            <td>{ project.description }</td>
                            <td>
                                <Link to={`/projects/edit/${project.id}`} className="button is-small is-info">Edit</Link>
                                <button onClick={ () => deleteProject(project.id) } className="button is-small is-danger">Delete</button>
                            </td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
    )
}
 
export default ViewProjects