import { Router } from 'express';
import userController from '../controller/user.controller';
import { validateBody } from '../middleware/validateBody';
import { userSchema } from '../schema/user.schema';

const rota = Router();

rota.post('/user', validateBody(userSchema), userController.newUser);
rota.get('/user/:id', userController.findUserId);
rota.get('/user', userController.findAllUsers);

export default rota;