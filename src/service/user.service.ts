import userModel from '../model/user.model';
import bcrypt from 'bcrypt';

const newUser = async (name: string, email: string, password: string) => {
    const hashPassword = await bcrypt.hash(password, 8);
    const result = await userModel.newUser({ name, email, password: hashPassword });
    return result;
};

export default {
    newUser
}