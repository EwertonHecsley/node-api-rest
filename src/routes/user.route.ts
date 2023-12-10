import { Router } from 'express';

const rota = Router();

rota.post('/user', (req, res) => res.send("cadastrou"))

export default rota;