import { HttpException } from '../middleware/HttpException';
import userModel from '../model/user.model';
import bcrypt from 'bcrypt';
import { format } from 'date-fns'
import { User } from '../utils/interfaces';

const newUser = async (name: string, email: string, password: string) => {
    const user = await userModel.findUserEmail(email);
    if (user) throw new HttpException(400, 'Email já cadastrado.');

    const hashPassword = await bcrypt.hash(password, 8);
    const result = await userModel.newUser({ name, email, password: hashPassword });
    return result;
};

const findUserId = async (id: string) => {
    const usuario_id = parseInt(id);
    const result = await userModel.findUserId(usuario_id);

    if (!result) throw new HttpException(404, 'Usuário não encontrado.');

    result.createdat instanceof Date && (result.createdat = format(result.createdat, 'dd/MM/yyyy'));

    const { password: _, ...resultFormated } = result;

    return resultFormated;
};

const findAllUsers = async (): Promise<User[]> => {
    const result = await userModel.findAllUsers();

    const resultFormated = result.map((element) => {
        element.createdat instanceof Date && (element.createdat = format(element.createdat, 'dd/MM/yyyy'));
        const { password: _, ...elementFomated } = element;
        return elementFomated as User;
    });
    return resultFormated;
};

export default {
    newUser,
    findUserId,
    findAllUsers
}