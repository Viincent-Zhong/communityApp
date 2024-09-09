import { Request, Response, NextFunction } from 'express';

export async function debugMiddleware(req: Request, res: Response, next: NextFunction) {
    const time = new Date(Date.now()).toLocaleTimeString();
    const clientUrl = req.get('origin') || req.get('referer');
    console.log(`${time} : ${req.path} ${req.method} request from ${clientUrl}`);
    next();
}