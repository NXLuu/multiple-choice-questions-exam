import User from '../models/user.model.js';
import sha1 from 'sha1';

export async function getUser(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
    }
}

export async function postUser(req, res) {
    try {
        const user = new User({
            name: req.body.name,
            password: sha1(req.body.password)
        });

        user.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}