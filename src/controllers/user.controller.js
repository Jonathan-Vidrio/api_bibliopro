import User from '../models/User';

/*
STATUS CODES
200: OK
201: Created
204: No Content
400: Bad Request
401: Unauthorized
403: Forbidden
404: Not Found
500: Internal Server Error
*/

const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

const getUSerById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
};

const addUser = async (req, res) => {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res.status(201).json(result);
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    Object.assign(user, req.body);
    const result = await user.save();
    res.status(204).json(result);
};

const disableUser = async (req, res) => {
    const { id } = req.params;
    const user = {
        status: false
    };
    const result = await User.findByIdAndUpdate(id, user);
    res.status(204).json();
};

const activateUser = async (req, res) => {
    const { id } = req.params;
    const user = {
        status: true
    };
    const result = await User.findByIdAndUpdate(id, user);
    res.status(204).json();
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    res.status(204).json();
};

export const methodsUser = {
    getUsers,
    getUSerById,
    addUser,
    updateUser,
    disableUser,
    activateUser,
    deleteUser
};