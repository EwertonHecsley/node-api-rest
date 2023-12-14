import { expect } from "chai";
import userService from "../../service/user.service";
import Sinon from "sinon";
import userModel from "../../model/user.model";
import jwt from "jsonwebtoken";
import { HttpException } from "../../middleware/HttpException";
import { User } from "../../utils/interfaces";
import { afterEach, beforeEach } from "mocha";

describe('Testando a camada service de login de usuários', () => {
    let usuario: User;

    beforeEach(() => {
        usuario = {
            id: 1,
            name: 'nome teste',
            email: 'email@teste',
            password: 'senha-qualquer', // Adicionando uma senha para o tipo User
        };
    });

    afterEach(() => {
        Sinon.restore();
    });

    it('quando o email é inválido', async () => {
        Sinon.stub(userModel, 'findUserEmail').resolves(undefined);
        Sinon.stub(userService, 'loginUser').rejects(new HttpException(401, 'Email inválido.'));

        const email = 'email inválido';
        const password = '123';

        try {
            await userService.loginUser(email, password);
            expect.fail('A exceção esperada não foi lançada.');
        } catch (error: any) {
            expect(error.message).to.equal('Email inválido.');
        }
    });

    it('Quando a senha é inválida', async () => {
        Sinon.stub(userModel, 'findUserEmail').resolves(usuario);
        Sinon.stub(userService, 'loginUser').rejects(new HttpException(401, 'Senha inválida.'));

        const email = usuario.email;
        const password = 'senha-incorreta';

        try {
            await userService.loginUser(email, password);
            expect.fail('A exceção esperada não foi lançada.');
        } catch (error: any) {
            expect(error.message).to.equal('Senha inválida.');
        }
    });

    it('Quando email e usuário são válidos', async () => {
        Sinon.stub(userModel, 'findUserEmail').resolves(usuario);
        Sinon.stub(jwt, 'sign').callsFake(async () => 'token-qualquer');
        Sinon.stub(userService, 'loginUser').resolves({ mensagem: 'Usuário logado com sucesso.', usuario, token: 'token-qualquer' });

        const email = usuario.email;
        const password = usuario.password;

        const result = await userService.loginUser(email, password);

        expect(result.mensagem).to.equal('Usuário logado com sucesso.');
        expect(result.token).to.equal('token-qualquer');
    });
});
