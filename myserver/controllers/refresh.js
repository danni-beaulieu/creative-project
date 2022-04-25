import Users from "../models/user.js";
import jwt from "jsonwebtoken";
 
export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) {
            // Unauthorized
            return res.sendStatus(401);
        }

        // Get user associated to token
        const user = await Users.findAll({
            where:{
                refresh_jwt: refreshToken
            }
        });

        if(!user[0]) {
            // Forbidden
            return res.sendStatus(403);
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if(error) {
                //Forbidden
                return res.sendStatus(403);
            }

            const userid = user[0].id;
            const login = user[0].login_name;
            const display = user[0].display_name;
            const customerid = user[0].customer_id;
            const token = jwt.sign({userid, login, display, customerid}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15m'
            });

            console.log("refreshToken: " + JSON.stringify(token));
            res.json({ token });
        });
    } catch (error) {
        console.log(error);
    }
}