import Collaborator from "../models/collaborator.js";
 
export const getAllCollaborators = async (req, res) => {
    try {
        const Collaborators = await Collaborator.findAll();
        res.json(Collaborators);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const createCollaborator = async (req, res) => {
    console.log(JSON.stringify(req.body));
    try {
        await Collaborator.create(req.body);
        res.json({
            "message": "Collaborator Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}