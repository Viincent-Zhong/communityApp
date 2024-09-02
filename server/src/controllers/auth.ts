import prisma from '../prisma/client';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
}
