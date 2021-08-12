import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";


import userRoute from './routes/user.route.js';
dotenv.config();
// require('dotenv').config();



const app = express();
const PORT = 3001;
const URI = process.env.URI;

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/users', userRoute);

app.get('/', (req, res) => {
    res.render('index');
});

//Database
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) =>{
        console.log('Connect to Db' + result);
        app.listen(PORT, () => {
            console.log("Ket noi thanh cong "+ PORT);
        });
    })
    .catch((err) => {
        console.log('err: ' + err);
    });
