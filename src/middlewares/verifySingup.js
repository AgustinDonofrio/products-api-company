import {ROLES} from '../models/Role.js'
import User from '../models/User.js'

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({username: req.body.username});
    const email = await User.findOne({username: req.body.email});

    if (user) return res.status(400).json({message: 'The user already exist'});

    if (email) return res.status(400).json({message: 'The email already exist'});

    next();
}

export const checRolesExisted = (req, res, next) => {
    const {roles} = req.body
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!ROLES.includes(roles[i])){
                return res.status(400).json({message: `Role ${roles[i]} does not exists`});
            }
        }
    }

    next();
}