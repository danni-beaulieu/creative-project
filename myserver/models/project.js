import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
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
 
export default Project;