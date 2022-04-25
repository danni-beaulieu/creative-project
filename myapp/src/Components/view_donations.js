import { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import jwt from './use_jwt';
import { AuthContext, useRefesh } from "./auth_context";
 
const ViewDonations = () => {
    const [donations, setDonations] = useState([]);
    const [cookies, setCookie] = useCookies(["userid", "customerid", "display"]);
    const [auth] = useContext(AuthContext);
    const [userid, customerid, display] = useRefesh();
 
    useEffect(() => {
        if (auth) {
            const decoded = jwt_decode(auth);
            setCookie("userid", decoded.userid, { path: '/' });
            setCookie("customerid", decoded.customerid, { path: '/' });
            setCookie("display", decoded.display, { path: '/' });
            getDonations();
        }
    }, [auth, setCookie, userid, customerid, display]);
 
    const getDonations = async () => {
        const response = await jwt.get(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/donations/${cookies.userid}`, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        });
        console.log(response.data);
        setDonations(response.data);
    }

    return (
        <div className="container">
        <div className="columns">
        <div className="column is-half is-offset-one-quarter">
        <div>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    { donations.map((donation, index) => (
                        <tr key={ donation.id }>
                            <td>{ index + 1 }</td>
                            <td>{ donation.project.title }</td>
                            <td>{ donation.amount }</td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
        </div>
        </div>
        </div>
    )
}
 
export default ViewDonations