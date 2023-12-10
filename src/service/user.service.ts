import userModel from '../model/user.model';

const newUser = async (name: string, email: string, password: string) => {
    const result = await userModel.newUser({ name, email, password });
    return result;
};

export default {
    newUser
}