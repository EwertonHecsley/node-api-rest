import { NextFunction, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config';
import { HttpException } from './HttpException';
import { AuthRequest } from '../utils/interfaces';

export const authMiddleware = (req: AuthRequest, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new HttpException(401, 'Para ter acesso, um token válido deve ser fornecido.');

    jwt.verify(token, process.env.JWT_KEY as Secret, (err, decoded) => {
        if (err) throw new HttpException(401, 'Token inválido.');
        req.user = decoded;
    });
    next();
};