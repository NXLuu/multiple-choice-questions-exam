import express from 'express';
import { isAuth } from '../../middleware/auth.middleware.js';
import { login, refreshToken } from '../controllers/auth.controller.js';
import userRoute from '../../routes/user.route.js';
import { createExam, getDetialExam, getExam } from '../controllers/exam.controller.js';
import { postAnswer } from '../controllers/result.controller.js';
const router = express.Router();


export let initAPIs = (app) => {
    debugger;
    router.post('/post-answer', postAnswer);
    router.post("/login", login);
    router.post("/refresh-token", refreshToken);
    router.use(isAuth);
    router.get('/create-exam', createExam);
    router.get('/exam', getExam);
    router.get('/exam/:id', getDetialExam);
    app.use(router);
    return app.use('/users', userRoute);
}