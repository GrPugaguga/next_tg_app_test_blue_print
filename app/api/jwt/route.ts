import { NextResponse } from "next/server";
import { checkJwt } from "../../../utils/checkJwt";

export async function POST(request: Request) {
    const userId = await checkJwt(request);
    
    if (userId) {
        const { message } = await request.json();

        if (message) {
            return NextResponse.json({
                message: 'Привет с сервера',
                userId: userId
            });
        } else {
            return NextResponse.json({
                message: 'Ошибка: сообщение отсутствует'
            }, { status: 400 });
        }
    } else {
        return NextResponse.json({ message: 'Недействительный токен' }, { status: 401 });
    }
}