import jwt from "jsonwebtoken";

export function verifyJWT(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded as { userId: string };
    } catch {
        return null;
    }
}
