import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { expect } from 'chai';
import Sinon from 'sinon';
import userModel from '../../model/user.model';
import { User } from '../../utils/interfaces';

chai.use(chaiHttp);

describe('POST/login', () => {

    afterEach(() => {
        Sinon.restore();
    });


    it('Deve retornar status 200 e token com credenciais válidas', async () => {
        const usuario = {
            id: 1,
            name: 'nome',
            email: 'email@existente.com',
            password: '$2b$08$uSoRwcCb6YJeNijrlVQ21el/1jR2xhkeIzmqT7OD7BYhHEe1Bvpqu'
        } as User;

        Sinon.stub(userModel, 'findUserEmail').resolves(usuario)


        const response = await chai.request(app)
            .post('/login')
            .send({
                email: 'email@existente.com',
                password: 'ewerton123'
            });
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.haveOwnProperty('token');

    });
    it('Deve retornar status 401 caso não seja passado um email válido', async () => {
        const response = await chai.request(app)
            .post('/login')
            .send({
                email: 'email@invalido.com',
                password: 'ewerton123'
            });
        expect(response.statusCode).to.equal(401);
    });
    it('Deve retornar status 401 caso não seja passado uma senha válida', async () => {
        const response = await chai.request(app)
            .post('/login')
            .send({
                email: 'email@invalido.com',
                password: 'senhaInválida'
            });
        expect(response.statusCode).to.equal(401);
    });
    it('Deve retornar status 500 caso não seja passado no corpo da requisição um email', async () => {
        const response = await chai.request(app)
            .post('/login')
            .send({
                password: 'senhaInválida'
            });
        expect(response.statusCode).to.equal(500);
        expect(response.serverError).to.equal(true)
    });
});