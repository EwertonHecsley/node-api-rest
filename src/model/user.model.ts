import knex from '../db.connection';
import { User } from '../utils/interfaces';

const newUser = async (user: User) => {
    const result = await knex<User>('users').insert(user).returning(['id', 'name', 'email']);
    return result
};


export default {
    newUser
}