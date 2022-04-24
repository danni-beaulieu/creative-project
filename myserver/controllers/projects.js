import Project from "../models/project.js";
import Collaborator from "../models/collaborator.js";
 
export const getAllProjects = async (req, res) => {
    try {
        const Projects = await Project.findAll({
            include: [{
              model: Collaborator
             }]
        });
        res.json(Projects);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getProjectById = async (req, res) => {
    try {
        console.log("projects | 14: ", req.params.id);
        const Projects = await Project.findAll({
            where: {
                id: req.params.id
            }
        });
        console.log("projects | 20", Projects[0]);
        res.json(Projects[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createProject = async (req, res) => {
    try {
        await Project.create(req.body);
        res.json({
            "message": "Project Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const updateProject = async (req, res) => {
    try {
        await Project.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Project Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteProject = async (req, res) => {
    try {
        await Project.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Project Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}