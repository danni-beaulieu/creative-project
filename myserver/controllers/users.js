import Users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/database.js";
 
export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','login_name','display_name', 'customer_id']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
 
export const Register = async(req, res) => {
    const { display, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const [results, metadata] = await db.query("SELECT auto_increment FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'wustl' AND TABLE_NAME = 'users';");
    console.log(JSON.stringify(results));

    let newLogin = display + results[0].auto_increment;

    try {
        const newUser = await Users.create({
            login_name: newLogin,
            display_name: display,
            password: hashPassword
        });
        console.log("Registration Successful");
        console.log(JSON.stringify(newUser));
        res.json({
            msg: "Registration Successful",
            success: true,
            login: newUser.login_name
        });
    } catch (error) {
        console.log("Error Registering");
        console.log(error);
    }
}
 
export const Login = async(req, res) => {
    try {
        console.log("Login: " + req.body.login);
        const user = await Users.findAll({
            where:{
                login_name: req.body.login
            }
        });

        console.log(JSON.stringify(user));
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) {
            // Bad Request
            return res.status(400).json({msg: "Wrong Password"});
        }

        const userid = user[0].id;
        const login = user[0].login_name;
        const display = user[0].display_name;
        const customerid = user[0].customer_id;
        const accessToken = jwt.sign({userid, login, display, customerid}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15m'
        });
        const refreshToken = jwt.sign({userid, login, display, customerid}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });

        await Users.update({refresh_jwt: refreshToken},{
            where:{
                id: userid
            }
        });

        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        // Not Found
        res.status(404).json({msg:"Login name not found"});
    }
}
 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_jwt: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_jwt: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

export const updateUser = async (req, res) => {
    try {
        await Users.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}