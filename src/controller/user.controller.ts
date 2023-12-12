import { Request, Response } from "express";
import userService from "../service/user.service";
import { User } from "../utils/interfaces";

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

const findAllUsers = async (req: Request, res: Response) => {
    let users: User[] = [];

    if (req.query) {
        const { name } = req.query;
        if (typeof name === 'string') users = await userService.findAllUsers(name);

        return res.status(200).json(users);
    }

    users = await userService.findAllUsers();
    return res.status(200).json(users);
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await userService.deleteUser(id);
    return res.status(204).send();
};

const updateUser = async (req: Request, res: Response) => {
    const { name, password, email } = req.body;
    const { id } = req.params;
    const result = await userService.updateUser({ name, email, password }, id);
    return res.status(200).json(result);
};

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    return res.status(200).json(result);
};

const userRecoveryPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    await userService.userRecoveryPassword(email);
    return res.status(200).json({ mensagem: 'Nova senha enviada ao email cadastrado.' });
};

export default {
    newUser,
    findUserId,
    findAllUsers,
    deleteUser,
    updateUser,
    loginUser,
    userRecoveryPassword
};