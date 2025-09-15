import { JwtPayload } from "../middleware/auth";
import jwt from "jsonwebtoken";

export function verifyToken(token: string): JwtPayload{
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export function getRoleFromToken(token: string, allowedRoles: JwtPayload['role'][]): JwtPayload['role'] {
    const payload = verifyToken(token);
    if (!allowedRoles.includes(payload.role)) {
        throw new Error('Insufficient permissions');
    }
    return payload.role;
}

export function getUsernameFromToken(token: string): JwtPayload['username']{
    if (!token){
        throw new Error('Invalid token')
    }
    const payload = verifyToken(token);
    return payload.username;
}

export function getUserIdFromToken(token:string): JwtPayload['id']{
    if (!token) throw new Error('Invalid Token')
    const payload = verifyToken(token);
    return payload.id
}