import Collaborator from "../models/collaborator.js";
import Project from "../models/project.js";
import Users from "../models/user.js";
 
export const getAllCollaborators = async (req, res) => {
    try {
        const Collaborators = await Collaborator.findAll();
        res.json(Collaborators);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getCollaboratorsByProjectId = async (req, res) => {
    console.log(JSON.stringify(req.body));
        try {
        const Projects = await Project.findAll({
            where: {
                id: req.params.id
            },
            include: [{
                model: Collaborator,
                include: [{
                    model: Users
                }]
            }]
        });
        res.json(Projects[0]);
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