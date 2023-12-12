import mustache from 'mustache';
import axios from '../email.connections';
import fs from 'fs/promises';

type EmailVariavels = {
    name: string
    password: string
};

export const sendEmaail = async (name: string, email: string, password: string) => {
    const template = await fs.readFile('src/utils/response.email.html', 'utf-8');

    const variaveis: EmailVariavels = {
        name,
        password,
    };

    const contentHtml = mustache.render(template, variaveis);

    const data = {
        "sender": {
            "name": "Ewerton Hecsley",
            "email": "ewerton.martinscomercial@gmail.com"
        },
        "to": [
            {
                "email": email,
                "name": name,
                "password": password
            }
        ],
        "subject": "Atenção! Nova senha gerada com sucesso.",
        "htmlContent": contentHtml
    };

    return await axios.post('', data);
};
