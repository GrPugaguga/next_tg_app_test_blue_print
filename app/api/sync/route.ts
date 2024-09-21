import { NextResponse } from "next/server"
import setUserData from "../../lib/setUserData"
import getUpgrades from "../../lib/getUpgrades"

export async function POST(request: Request) {
        const user = await request.json();
        const upgrades = await getUpgrades();
        const result = await setUserData(user)
        if (result) {
            // Возвращаем данные пользователя, если они найдены
            return NextResponse.json({
                message: 'Sync is successful!',
                user: user,
                upgrades: upgrades
            });
        } else {
            // Если данных нет
            return NextResponse.json({
                message: 'Ошибка: сообщение отсутствует'
            }, { status: 400 });
        }
}
