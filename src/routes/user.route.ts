import { Router } from 'express';
import userController from '../controller/user.controller';

const rota = Router();

rota.post('/user', userController.newUser);
rota.get('/user/:id', userController.findUserId);

export default rota;