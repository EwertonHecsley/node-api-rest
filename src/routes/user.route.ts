import { Router } from 'express';
import userController from '../controller/user.controller';

const rota = Router();

rota.post('/user', userController.newUser);
rota.get('/user/:id', userController.findUserId);
rota.get('/user', userController.findAllUsers);

export default rota;