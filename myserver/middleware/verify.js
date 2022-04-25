import jwt from "jsonwebtoken";
 
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        // Unauthorized
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if(error) {
            // Forbidden
            return res.sendStatus(403);
        }
        next();
    })
}