import Donation from "../models/donation.js";

export const makeDonation = async (req, res) => {
    console.log(JSON.stringify(req.body));
    try {
        await Donation.create(req.body);
        res.json({
            "message": "Donation Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}