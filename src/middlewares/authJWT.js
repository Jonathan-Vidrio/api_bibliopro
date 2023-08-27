import jwt from "jsonwebtoken";
import { configJWT } from "../config";

const decodeToken = (token) => {
    if (token) return jwt.verify(token, configJWT.secret);
};

export {
    decodeToken
};