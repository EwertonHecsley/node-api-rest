import 'dotenv/config';
import knex from 'knex';

const config = {
    client: process.env.CLIENT,
    connection: {
        host: process.env.BD_HOST,
        port: process.env.BD_PORT as unknown as number,
        user: process.env.BD_USER,
        password: process.env.BD_PASSWORD,
        database: process.env.BD_DATABASE
    }
};

const connection = knex(config);

export default connection;