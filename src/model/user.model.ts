import knex from '../db.connection';
import { User } from '../utils/interfaces';

const newUser = async (user: User) => {
    const result = await knex<User>('users').insert(user).returning(['id', 'name', 'email']);
    return result
};

const findUserEmail = async (email: string) => {
    const result = await knex<User>('users').where({ email }).first();
    return result;
};

const findUserId = async (id: number) => {
    const result = await knex<User>('users').where({ id }).first();
    return result;
};

export default {
    newUser,
    findUserEmail,
    findUserId
}