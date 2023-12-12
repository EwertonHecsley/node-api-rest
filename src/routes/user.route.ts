import { Router } from 'express';
import userController from '../controller/user.controller';
import { validateBody } from '../middleware/validateBody';
import { userSchema } from '../schema/user.schema';

const rota = Router();

rota.post('/login', userController.loginUser);

rota.post('/user', validateBody(userSchema), userController.newUser);
rota.get('/user/:id', userController.findUserId);
rota.delete('/user/:id', userController.deleteUser);
rota.put('/user/:id', validateBody(userSchema), userController.updateUser);
rota.get('/user', userController.findAllUsers);

export default rota;