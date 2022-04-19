import { Sequelize } from "sequelize";
 
const db = new Sequelize('wustl', 'wustl_inst', 'wustl_pass', {
    host: "localhost",
    dialect: "mariadb",
    define: {
        timestamps: false
    }
});
 
export default db;