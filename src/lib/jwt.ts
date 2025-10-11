import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
    throw new Error("Please set JWT_SECRET in .env.local");
}

export function signToken(payload: object, expiresIn = "15m") {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken<T = any>(token: string): T {
    return jwt.verify(token, JWT_SECRET) as T;
}
