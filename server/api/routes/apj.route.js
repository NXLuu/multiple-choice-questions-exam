import express from 'express';
import { isAuth } from '../../middleware/auth.middleware.js';
import { login, refreshToken } from '../controllers/auth.controller.js';
import userRoute from '../../routes/user.route.js';
const router = express.Router();


export let initAPIs = (app) => {
    router.post("/login", login);
    router.post("/refresh-token", refreshToken);
    
    router.use(isAuth);
    app.use(router);
    return app.use('/users', userRoute);
}