import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/index.js";

import Project from "./models/project.js";
import Users from "./models/user.js";
import Collaborator from "./models/collaborator.js";
import Donation from "./models/donation.js";

dotenv.config();
const app = express();

const connectToDB = async () => {
    try {
        await db.authenticate();
        console.log('Database connected...');
    } catch (error) {
        console.error('Connection error:', error);
    }
}
connectToDB();
Collaborator.belongsTo(Users, {
    foreignKey: "collaborator_id"
});
Donation.belongsTo(Project, {
    foreignKey: "project_id"
});
Project.hasMany(Collaborator, {
    foreignKey: 'project_id'
});
Users.hasMany(Donation, {
    foreignKey: 'user_id'
});
 
app.use(cors({ credentials:true, origin:'http://ec2-44-202-59-171.compute-1.amazonaws.com:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
 
app.listen(5000, ()=> console.log('Server running at port 5000'));