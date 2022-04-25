import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Project from "./project.js";
 
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
 
(async () => {
    try {
        await db.sync();
        console.log("Success!");
    } catch (error) {
        console.log(error);
    }
})();

export default Donation;