import User from '../models/user.model.js';

export async function getUser(req, res) {
    try {
        const users = await User.find();
        console.log(users);
        res.json(users);
    } catch (err) {
        console.log(err);
    }
}

export async function postUser(req, res) {
    try {
        console.log(req.body);
        const user = new User({
            name: req.body.name,
            password: req.body.password
        });

        user.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}