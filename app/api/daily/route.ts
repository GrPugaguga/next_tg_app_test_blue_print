import { NextResponse } from "next/server"
import { checkJwt } from "../../../utils/checkJwt";
import setUserDaily from "../../lib/setUserDaily";

export async function GET(request: Request) {
    const userId = await checkJwt(request);
    if (userId) {
        const res = await setUserDaily(userId)
        console.log('dailyCheckIn')
        console.log(res)
        if (res) {
            // Возвращаем данные пользователя, если они найдены
            return NextResponse.json({
                message: 'Daily revard has been claimed!',
                revard: res.daily_reward,
                last_claim_time: res.last_claim_time,
                streak: res.streak
            });
        } else {
            // Если данных нет
            return NextResponse.json({
                message: 'Ошибка: сообщение отсутствует'
            }, { status: 400 });
        }
    } else {
        return NextResponse.json({ message: 'Недействительный токен' }, { status: 401 });
    }
}
