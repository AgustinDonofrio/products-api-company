import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import Role from '../models/Role.js';

export const singUp = async (req, res) => {
    try {  
        const {username, email, password, roles} = req.body;
        
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })

        if (roles) {
            const foundRoles = await Role.find({name: {$in: roles}});
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({name: 'user'});
            newUser.roles = [role._id];
        }

        const savedUser = await newUser.save();

        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 86400 // 24 hs
        })

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const singIn = async (req, res) => {
    try {
        const { password, email } = req.body;
        const userFound = await User.findOne({email: email}).populate("roles");

        if (!userFound) return res.status(400).json({message: 'User not fount'});

        const matchPassword = await User.comparePassword(password, userFound.pasword);

        if (!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'});

        const token = jwt.sign({id: userFound._id}, config.SECRET, {
            expiresIn: 86400
        });

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};