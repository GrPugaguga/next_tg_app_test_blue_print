import { NextResponse } from "next/server"
import setUserAvatar from "../../lib/setUserAvatar"

export async function POST(request: Request) {
        const { id,photoPath } = await request.json();
        const result = await setUserAvatar(id, photoPath)
        if (result) {
            // Возвращаем данные пользователя, если они найдены
            return NextResponse.json({
                message: 'Avatar has been changed!',
            });
        } else {
            // Если данных нет
            return NextResponse.json({
                message: 'Ошибка: сообщение отсутствует'
            }, { status: 400 });
        }
}
