import { NextResponse } from "next/server";
import { checkJwt } from "../../../utils/checkJwt";
import setNewUpgrate from "../../lib/setNewUpgrate";
import getUpgrades from "../../lib/getUpgrades";
import getUserData from "../../lib/getUserData";

export async function POST(request: Request) {
    const userId = await checkJwt(request);
    
    if (userId) {
        const { user, upgrade } = await request.json();
        const result = await setNewUpgrate(user, upgrade)
        const userData = await getUserData(userId)
        const upgrades = await getUpgrades();
        if (result) {
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