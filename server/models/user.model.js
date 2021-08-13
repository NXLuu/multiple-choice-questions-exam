import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    name: String,
    password: String,
},{
    versionKey: false // You should be aware of the outcome after set to false
});

const User = mongoose.model('User', userSchema);

export default User;
