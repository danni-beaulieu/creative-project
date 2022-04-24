import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Donation = db.define('donations',{
    project_id:{
        type: DataTypes.BIGINT.UNSIGNED
    },
    user_id:{
        type: DataTypes.BIGINT.UNSIGNED
    },
    amount: {
        type: DataTypes.INTEGER.UNSIGNED
    }
},{
    freezeTableName: true
});
 
export default Donation;