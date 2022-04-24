import Donation from "../models/donation.js";
import Users from "../models/user.js";
import Project from "../models/project.js";

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

export const getDonationsByCustomerId = async (req, res) => {
    console.log(JSON.stringify(req.body));
    try {
        const Donations = await Users.findAll({
            where: {
                id: req.params.id
            },
            include: [{
              model: Donation, 
              include: [{
                  model: Project
                }] 
             }]
        });
        res.json(Donations[0].donations);
    } catch (error) {
        res.json({ message: error.message });
    } 
}