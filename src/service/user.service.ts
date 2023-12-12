import { HttpException } from '../middleware/HttpException';
import userModel from '../model/user.model';
import bcrypt from 'bcrypt';
import { format } from 'date-fns'
import { User } from '../utils/interfaces';
import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config';
import { generateAleatoryPassword } from '../utils/extra.functions';
import { sendEmaail } from '../utils/send.email';

const newUser = async (name: string, email: string, password: string) => {
    const user = await userModel.findUserEmail(email);
    if (user) throw new HttpException(400, 'Email já cadastrado.');

    const hashPassword = await bcrypt.hash(password, 8);
    const result = await userModel.newUser({ name, email, password: hashPassword });
    return result;
};

const findUserId = async (id: string) => {
    const user_id_number = parseInt(id);
    const result = await userModel.findUserId(user_id_number);

    if (!result) throw new HttpException(404, 'Usuário não encontrado.');

    result.createdat instanceof Date && (result.createdat = format(result.createdat, 'dd/MM/yyyy'));

    const { password: _, ...resultFormated } = result;

    return resultFormated;
};

const findAllUsers = async (filter?: string): Promise<User[]> => {
    let result: User[] = await userModel.findAllUsers();

    if (filter) result = result.filter((element) => element.name.toLowerCase().includes(filter.toLowerCase()));

    const resultFormated = result.map((element) => {
        element.createdat instanceof Date && (element.createdat = format(element.createdat, 'dd/MM/yyyy'));
        const { password: _, ...elementFomated } = element;
        return elementFomated as User;
    });

    return resultFormated;
};

const deleteUser = async (id: string) => {
    const user_id_number = parseInt(id);
    const result = await userModel.findUserId(user_id_number);

    if (!result) throw new HttpException(404, 'Usuário não encontrado para esse ID.');

    await userModel.deleteUser(user_id_number);
};

const updateUser = async ({ name, email, password }: User, id: string) => {
    const user_id_number = parseInt(id)
    const user = await userModel.findUserId(user_id_number);

    if (!user) throw new HttpException(404, 'Usuário não encontrado para esse ID.');

    const userEmail = await userModel.findUserEmail(email);

    if (userEmail) throw new HttpException(400, 'Email já cadastrado.');

    const hashPassword = await bcrypt.hash(password, 8);
    const result = await userModel.updateUser({ name, email, password: hashPassword }, user_id_number);
    return result;
};

const loginUser = async (email: string, password: string) => {
    const result = await userModel.findUserEmail(email) as User;

    if (!result) throw new HttpException(401, 'Email inválido.');

    const verifyPassword = await bcrypt.compare(password, result?.password);

    if (!verifyPassword) throw new HttpException(401, 'Senha inválida.');

    const token = await jwt.sign({ id: result.id }, process.env.JWT_KEY as Secret);
    const { password: _, createdat: __, ...resultFormated } = result;
    return { mensagem: 'Usuário logado com sucesso.', usuario: resultFormated, token };
};

const userRecoveryPassword = async (emailUser: string) => {
    const result = await userModel.findUserEmail(emailUser);

    if (!result) throw new HttpException(404, 'Email não encontrado.');

    const { id, name, email } = result;

    if (typeof id === 'number') {
        const newPassword = await generateAleatoryPassword();
        result.password = newPassword;
        await sendEmaail(name, email, result.password);
        const hashNewPassword = await bcrypt.hash(result.password, 8);
        await userModel.updateGeneric('password', hashNewPassword, id);
    };

};


export default {
    newUser,
    findUserId,
    findAllUsers,
    deleteUser,
    updateUser,
    loginUser,
    userRecoveryPassword
}