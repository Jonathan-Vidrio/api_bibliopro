import User from '../models/User';
import jwt from 'jsonwebtoken';
import { configJWT } from '../config';

const signup = async (req, res) => {
    const { username, email, password, roles } = req.body;

    const foundUserByUsername = await User.findOne({ username: username });
    if (foundUserByUsername) return res.status(400).json({ message: "Username exist" });
    
    const foundUserByEmail = await User.findOne({ email: email });
    if (foundUserByEmail) return res.status(400).json({ message: "Email exist" });

    const hashedPassword = await User.encryptPassword(password);
    const newUser = new User ({
        username,
        email,
        password: hashedPassword
    });

    if (roles) {
        const foundRole = await Role.find({ name: { $in: roles}});
        newUser.roles = foundRole.map(role => role._id);
    } else {
        const role = await Role.findOne({ name: 'user' });
        newUser.roles = [role._id];
    };

    const result = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: result._id }, configJWT.secret, {
        expiresIn: 86400 // 24 hours
    });
    res.status(200).json({ token });
};

const signin = async (req, res) => {
    const { username, email, password } = req.body;
    const value = username || email;
    const filter = username ? { username: value } : { email: value };
    
    const foundUser = await User.findOne(filter).populate("roles");
    if (!foundUser) return res.status(400).json({ message: 'User not found' });

    const matchPassword = await User.comparePassword(password, foundUser.password);
    if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' });
    
    const token = jwt.sign({ id: foundUser._id }, configJWT.secret, {
        expiresIn: 86400 // 24 hours
    });
    return res.status(200).json({ token: token });
};


export const methodsAuth = {
    signup,
    signin
};