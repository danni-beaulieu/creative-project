import { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import jwt from './use_jwt';
import { AuthContext, useRefesh } from "./auth_context";
 
const ViewMethods = () => {
    const [methods, setMethods] = useState([]);
    const [cookies, setCookie] = useCookies(["userid", "customerid", "display"]);
    const [auth] = useContext(AuthContext);
    const [userid, customerid, display] = useRefesh();

    useEffect(() => {
        if (auth) {
            const decoded = jwt_decode(auth);
            setCookie("userid", decoded.userid, { path: '/' });
            setCookie("customerid", decoded.customerid, { path: '/' });
            setCookie("display", decoded.display, { path: '/' });
            getPaymentMethods();
        }
    }, [auth, setCookie, userid, customerid, display]);
 
    const getPaymentMethods = async () => {
        const response = await jwt.get(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/customer/${cookies.customerid}`, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        });
        let pms = new Array();
        let cards = response.data.methods.data;
        for (let pm in cards) {
          let newPM = {id: cards[pm].id, four: cards[pm].card.last4, month: cards[pm].card.exp_month, year: cards[pm].card.exp_year};
          pms.push(newPM);
        }
        setMethods(pms);
      }
 
    const deleteMethod = async (id) => {
        await jwt.delete(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/method/${id}`, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        });
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
                        <th>Exp Month</th>
                        <th>Exp Year</th>
                    </tr>
                </thead>
                <tbody>
                    { methods.map((method, index) => (
                        <tr key={ method.id }>
                            <td>{ index + 1 }</td>
                            <td>{ method.four }</td>
                            <td>{ method.month }</td>
                            <td>{ method.year }</td>
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