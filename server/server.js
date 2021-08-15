﻿import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from "body-parser";
import { initAPIs } from "./api/routes/apj.route.js";


const app = express();
const PORT = 3001;
const URI = process.env.URI;

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => {
    res.render('index');
});

initAPIs(app);

//Database
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) =>{
        app.listen(PORT, () => {
            console.log("Ket noi thanh cong "+ PORT);
        });
    })
    .catch((err) => {
        console.log('err: ' + err);
    });
