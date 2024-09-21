import { NextResponse } from "next/server"
import setUserData from "../../lib/setUserData"

export async function POST(request: Request) {
        const user = await request.json();
        const result = await setUserData(user)
        if (result) {
            // Возвращаем данные пользователя, если они найдены
            return NextResponse.json({
                message: 'Avatar has been changed!',
                user: user
            });
        } else {
            // Если данных нет
            return NextResponse.json({
                message: 'Ошибка: сообщение отсутствует'
            }, { status: 400 });
        }
}
