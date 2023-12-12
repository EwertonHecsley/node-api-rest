import { Router } from 'express';
import userController from '../controller/user.controller';
import { validateBody } from '../middleware/validateBody';
import shema from '../schema/user.schema';
import { authMiddleware } from '../middleware/authMiddleware';

const rota = Router();

rota.post('/login', validateBody(shema.loginShema), userController.loginUser);
rota.post('/user/password', validateBody(shema.emailSchema), userController.userRecoveryPassword);
rota.post('/user', validateBody(shema.userSchema), userController.newUser);

rota.use(authMiddleware);

rota.get('/user/:id', userController.findUserId);
rota.delete('/user/:id', userController.deleteUser);
rota.put('/user/:id', validateBody(shema.userSchema), userController.updateUser);
rota.get('/user', userController.findAllUsers);

export default rota;