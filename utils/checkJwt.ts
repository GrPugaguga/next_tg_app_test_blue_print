import { jwtVerify } from "jose";       

export const checkJwt = async (request: Request): Promise<string | false> => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }
    const token = authHeader.split(' ')[1];
    const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload.id as string;
    } catch (error) {
        return false;
    }
}