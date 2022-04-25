import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import Select from 'react-select';
import jwt from './use_jwt';
import { AuthContext, useRefesh } from "./auth_context";

const AddCollaborator = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [msg, setMsg] = useState('');
    const [users, setUsers] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [collaborator, setCollaboratorID] = useState('');
    const [cookies, setCookie] = useCookies(["userid", "customerid", "display"]);
    const [auth] = useContext(AuthContext);
    const [userid, customerid, display] = useRefesh();

    useEffect(() => {
        const getCollaborators = async () => {
            try {
                const response = await jwt.get(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/collaborators/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth}`
                    }
                });
                console.log(JSON.stringify(response));
                setCollaborators(response.data.collaborators);
            } catch (error) {
                console.log("add_collaborators.getCollaborators: " + error);
            }
        }
        const getUsers = async () => {
            try {
                const response = await jwt.get('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/users', {
                    headers: {
                        Authorization: `Bearer ${auth}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.log("add_collaborators.getUsers: " + error);
            }
        }
        if (auth) {
            const decoded = jwt_decode(auth);
            setCookie("userid", decoded.userid, { path: '/' });
            setCookie("customerid", decoded.customerid, { path: '/' });
            setCookie("display", decoded.display, { path: '/' });
            getCollaborators()
            getUsers();
        }
    }, [auth, setCookie, userid, customerid, display]);

    const addCollaborator = async (e) => {
        e.preventDefault();
        console.log(collaborator);
        try {
            await jwt.post('http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/collaborators', {
                project_id: id,
                collaborator_id: collaborator.value
            }, { headers: {
                Authorization: `Bearer ${auth}`
            }});
            console.log("Successful add!")
            navigate("/projects");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.message);
            }
        }
        console.log("adding collaborator...");
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={addCollaborator} className="box">
                                <p className="has-text-centered">{msg}</p>

                                <table className="table is-striped">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Login</th>
                                            <th>Display</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { collaborators.map((collaborator, index) => (
                                        <tr key={ collaborator.user.id }>
                                            <td>{ index + 1 }</td>
                                            <td>{ collaborator.user.login_name }</td>
                                            <td>{ collaborator.user.display_name }</td>
                                        </tr>
                                    )) }
                                    </tbody>
                                </table>

                                <div className="field mt-5">
                                    <Select
                                        defaultValue={collaborator}
                                        onChange={setCollaboratorID}
                                        options={users.map((user, index) => {
                                            return {
                                              label: user.login_name,
                                              value: user.id,
                                              key: index
                                            };
                                          })}
                                    />
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default AddCollaborator