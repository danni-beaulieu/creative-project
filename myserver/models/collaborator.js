import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Collaborator = db.define('collaborators',{
    project_id:{
        type: DataTypes.BIGINT.UNSIGNED
    },
    collaborator_id:{
        type: DataTypes.BIGINT.UNSIGNED
    }
},{
    freezeTableName: true
});
 
export default Collaborator;