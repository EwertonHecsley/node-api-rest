import Joi from 'joi';
import { NextFunction, Request, Response } from "express";
import { JoiRequestBody } from '../utils/interfaces';

export const validateBody = (schema: Joi.ObjectSchema<JoiRequestBody>) => async (req: Request, _res: Response, next: NextFunction) => {
    await schema.validateAsync(req.body);
    next();
};


