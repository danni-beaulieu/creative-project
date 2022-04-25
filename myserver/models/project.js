import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Collaborator from "./collaborator.js";
 
const { DataTypes } = Sequelize;
 
const Project = db.define('projects',{
    user_id:{
        type: DataTypes.BIGINT.UNSIGNED
    },
    title:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName: true
});

(async () => {
    try {
        await db.sync();
        console.log("Success!");
    } catch (error) {
        console.log(error);
    }
})();

export default Project;