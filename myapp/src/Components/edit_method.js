import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import jwt from './use_jwt';
import { AuthContext, useRefesh } from "./auth_context";
import { useCookies } from "react-cookie";
 
const EditMethod = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [cookies, setCookie] = useCookies(["userid", "customerid", "display"]);
    const [auth] = useContext(AuthContext);
    const [userid, customerid, display] = useRefesh();
 
    const updateMethod = async (e) => {
        e.preventDefault();
        const response = await jwt.patch(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/method/${id}`,{
            card: { exp_month: month, exp_year: year }
        }, { headers: {
            Authorization: `Bearer ${auth}`
        }});
        console.log(JSON.stringify(response));
        navigate("/methods");
    }

    useEffect(() => {
        if (auth) {
            const decoded = jwt_decode(auth);
            setCookie("userid", decoded.userid, { path: '/' });
            setCookie("customerid", decoded.customerid, { path: '/' });
            setCookie("display", decoded.display, { path: '/' });
        }
    }, [auth, setCookie, userid, customerid, display]);
 
    useEffect(() => {
        getMethodById();
    }, []);
 
    const getMethodById = async () => {
        const response = await jwt.get(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/method/${id}`, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        });
        let card = response.data.card;
        console.log(JSON.stringify(response.data.card));
        setMonth(card.exp_month);
        setYear(card.exp_year);
    }
 
    return (
        <div className="container">
        <div className="columns">
        <div className="column is-half is-offset-one-quarter">
        <div>
            <form onSubmit={ updateMethod }>
                <div className="field">
                    <label className="label">Exp Month</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Month"
                        value={ month }
                        onChange={ (e) => setMonth(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Exp Year</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Year"
                        value={ year }
                        onChange={ (e) => setYear(e.target.value) }
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
 
export default EditMethod