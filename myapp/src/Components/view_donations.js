import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
 
const ViewDonations = () => {
    const [donations, setDonations] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(["userid"]);
 
    useEffect(() => {
        getDonations();
    }, []);
 
    const getDonations = async () => {
        const response = await axios.get(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/donations/${cookies.userid}`);
        console.log(response.data);
        setDonations(response.data);
    }

    return (
        <div className="container">
        <div className="columns">
        <div className="column is-half is-offset-one-quarter">
        <div>
            <Link to="/projects/create" className="button is-primary mt-2">Create</Link>
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