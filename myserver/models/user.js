import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Users = db.define('users',{
    login_name:{
        type: DataTypes.STRING
    },
    display_name:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_jwt:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});
 
(async () => {
    try {
        await db.sync();
        console.log("Success!");
    } catch (error) {
        console.log(error);
    }
})();
 
export default Users;