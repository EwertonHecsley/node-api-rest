import { Request } from "express"

export interface User {
    id?: number
    createdat?: Date | string
    name: string
    email: string
    password: string
};

export interface JoiRequestBody {
    name: string
    email: string
    password: string
};

export interface AuthRequest extends Request {
    user?: any;
}