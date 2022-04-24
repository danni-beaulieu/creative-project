import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Donation from "./donation.js";
 
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
    },
    customer_id:{
        type: DataTypes.STRING
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

Users.hasMany(Donation, {
    foreignKey: 'user_id'
  });
 
export default Users;