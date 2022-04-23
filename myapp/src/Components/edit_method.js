import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
 
const EditMethod = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
 
    const updateMethod = async (e) => {
        e.preventDefault();
        await axios.patch(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/method/${id}`,{
            card: {exp_month: month, exp_year: year}
        });
        navigate("/methods");
    }
 
    useEffect(() => {
        getMethodById();
    }, []);
 
    const getMethodById = async () => {
        const response = await axios.get(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/method/${id}`);
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