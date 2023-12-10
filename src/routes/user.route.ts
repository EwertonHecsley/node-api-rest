import { Router } from 'express';
import userController from '../controller/user.controller';

const rota = Router();

rota.post('/user', userController.newUser);

export default rota;