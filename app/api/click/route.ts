import { NextResponse } from "next/server";
import { checkJwt } from "../../../utils/checkJwt";
import getUserData from "../../lib/getUserData";
import setUserClick from "../../lib/setUserClick";

export async function POST(request: Request) {
    const userId = await checkJwt(request);
    if (userId) {
        const { clicks, energy, timestamp } = await request.json();
        const info = await getUserData(userId).then(user => user ? 
                                                {last_sync_timestamp: user.last_sync_timestamp,
                                                points_per_second: user.points_per_second,
                                                points_per_click: user.points_per_click} 
                                                : false)
        if (info) {
            const points_increment = clicks*info.points_per_click + Math.floor((timestamp-info.last_sync_timestamp)/1000)*info.points_per_second
            const result = await setUserClick(userId, points_increment, energy,timestamp)
            if (result) {
                const user = await getUserData(userId)
                return NextResponse.json({
                    message: 'success',
                    user: user
                });
            } else {
                return NextResponse.json({
                    message: 'Ошибка: сообщение отсутствует'
                }, { status: 400 });
            }
        }  else{
            return NextResponse.json({
                message: 'Ошибка: сообщение отсутствует'
            }, { status: 400 });
        }  } else {
        return NextResponse.json({ message: 'Недействительный токен' }, { status: 401 });
    }
}