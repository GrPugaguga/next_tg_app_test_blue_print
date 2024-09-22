import { NextResponse } from "next/server";
import { checkJwt } from "../../../utils/checkJwt";
import setNewUpgrate from "../../lib/setNewUpgrate";
import getUpgrades from "../../lib/getUpgrades";
import getUserData from "../../lib/getUserData";

export async function POST(request: Request) {
    const userId = await checkJwt(request);
    
    if (userId) {
        const { user, upgrade } = await request.json();
        const upgrades = await getUpgrades();
        const userPoints = await getUserData(userId).then(data => data? data.points : 0)
        if( upgrade.level.price > userPoints){
            return NextResponse.json({
                message: 'Недостаточно очков',
                upgrades: upgrades,
                user: user
            }, { status: 400 });
        }
        const result = await setNewUpgrate(user, upgrade)
        if (result) {
            const userData = await getUserData(userId)
            return NextResponse.json({
                message: 'Upgrate success',
                upgrades: upgrades,
                user: userData
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