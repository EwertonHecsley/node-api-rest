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
}

export default {
    newUser,
    findUserId
};