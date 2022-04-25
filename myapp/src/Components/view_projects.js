import { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import jwt from './use_jwt';
import { AuthContext, useRefesh } from "./auth_context";
 
const ViewProjects = () => {
    const [projects, setProjects] = useState([]);
    const [cookies, setCookie] = useCookies(["userid", "customerid", "display"]);
    const [auth] = useContext(AuthContext);
    const [userid, customerid, display] = useRefesh();

    const getProjects = async () => {
        const response = await jwt.get('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/projects', {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        });
        console.log(response.data);
        setProjects(response.data);
    }

    useEffect(() => {
        if (auth) {
            const decoded = jwt_decode(auth);
            setCookie("userid", decoded.userid, { path: '/' });
            setCookie("customerid", decoded.customerid, { path: '/' });
            setCookie("display", decoded.display, { path: '/' });
            getProjects();
        }
    }, [auth, setCookie, userid, customerid, display]);
 
    const deleteProject = async (id) => {
        await jwt.delete(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        });
        getProjects();
    }

    function userAllowed (projectid) {
        let p = projects.find(i => i.id === projectid);

        let isCollaborator = false;
        for (let c in p.collaborators) {
            if (p.collaborators[c].collaborator_id == cookies.userid) {
                isCollaborator = true;
            }
        }
        if (p.user_id == cookies.userid || isCollaborator) {
            return true;
        } else {
            return false;
        }
    }
 
    return (
        <div className="container mt-5">
        <div>
        <h1>Welcome Back: {cookies.display}</h1>
        <div className="buttons is-right"><Link to="/projects/create" className="button is-primary mt-2 is-right">Create</Link></div>
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
                            <Link to={`/projects/donate/${project.id}`} className="button is-small is-link">Donate</Link>
                            { (userAllowed(project.id)) ? 
                                <><Link to={`/projects/edit/${project.id}`} className="button is-small is-info">Edit</Link>
                                <Link to={`/collaborators/${project.id}`} className="button is-small is-warning">Collaborators</Link>
                                </>
                            : null }
                            { cookies.userid == project.user_id ? 
                                <button onClick={() => deleteProject(project.id)} className="button is-small is-danger">Delete</button>
                                : null
                            }
                            </td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
        </div>
    )
}
 
export default ViewProjects