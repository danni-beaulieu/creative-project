import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
 
const ViewMethods = () => {
    const [methods, setMethods] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(["userid", "customerid"]);
    let userid = cookies.userid;
    let customerid = cookies.customerid;
 
    useEffect(() => {
        getPaymentMethods();
    }, []);
 
    const getPaymentMethods = async () => {
        console.log(customerid);
        const response = await axios.get(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/customer/${customerid}`);
        console.log(JSON.stringify(response.data));
        let pms = new Array();
        let cards = response.data.methods.data;
        for (let pm in cards) {
          let newPM = {id: cards[pm].id, four: cards[pm].card.last4};
          pms.push(newPM);
        }
        console.log(JSON.stringify(pms));
        setMethods(pms);
      }
 
    const deleteMethod = async (id) => {
        await axios.delete(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/method/${id}`);
        getPaymentMethods();
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
                        <th>Last Four</th>
                    </tr>
                </thead>
                <tbody>
                    { methods.map((method, index) => (
                        <tr key={ method.id }>
                            <td>{ index + 1 }</td>
                            <td>{ method.four }</td>
                            <td>
                                <><Link to={`/methods/edit/${method.id}`} className="button is-small is-info">Edit</Link>
                                <button onClick={() => deleteMethod(method.id)} className="button is-small is-danger">Delete</button></>
                            </td>
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
 
export default ViewMethods