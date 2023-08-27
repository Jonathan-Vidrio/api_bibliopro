import { decodeToken } from "./authJWT";
import User from "../models/User";
import Role from "../models/Role";

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        const tokenDecoded = decodeToken(token);
        if (!tokenDecoded) return res.status(403).json({ message: "No token provided" });

        const user = await User.findById(tokenDecoded.id, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });

        const roles = await Role.find({ _id: { $in: user.roles } });
        if (!roles.some(role => role.name === "admin")) return res.status(403).json({ message: "Require Admin Role"});

        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized" });
    }
};

const isModerator = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        const tokenDecoded = decodeToken(token);
        if (!tokenDecoded) return res.status(403).json({ message: "No token provided" });

        const user = await User.findById(tokenDecoded.id, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });

        const roles = await Role.find({ _id: { $in: user.roles } });
        if (!roles.some(role => role.name === "moderator")) return res.status(403).json({ message: `Require Moderator Role`});
        
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized" });
    }
};

const isUser = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        const tokenDecoded = decodeToken(token);
        if (!tokenDecoded) return res.status(403).json({ message: "No token provided" });

        const user = await User.findById(tokenDecoded.id, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });

        const roles = await Role.find({ _id: { $in: user.roles } });
        if (!roles.some(role => role.name === "user")) return res.status(403).json({ message: `Require User Role`});
        
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized" });
    }
};

export const role = {
    isAdmin,
    isModerator,
    isUser
}