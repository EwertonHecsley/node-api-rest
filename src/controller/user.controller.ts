import { Request, Response } from "express";
import userService from "../service/user.service";

const newUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const [user] = await userService.newUser(name, email, password);
    return res.status(201).json({ mensagem: 'Usuario cadastrado com sucesso.', usuario: user });
};

const findUserId = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await userService.findUserId(id);
    return res.status(200).json(user);
};

const findAllUsers = async (_req: Request, res: Response) => {
    const users = await userService.findAllUsers();
    return res.status(200).json(users);
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await userService.deleteUser(id);
    return res.status(204).send();
};

export default {
    newUser,
    findUserId,
    findAllUsers,
    deleteUser
};