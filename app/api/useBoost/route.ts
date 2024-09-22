import { NextResponse } from "next/server";
import { checkJwt } from "../../../utils/checkJwt";
import recharge from "../../lib/recharge";
import multitouch from "../../lib/multitouch";

export async function POST(request: Request) {
    const userId = await checkJwt(request);

    if (userId) {
        const { booster } = await request.json();
        switch (booster) {
            case 'recharge':
                const rechargeResult = await recharge(userId);
                if (rechargeResult) {
                    return NextResponse.json({
                    message: 'Energy is full',
                    booster: booster,
                    user: rechargeResult
                });
            } else {
                return NextResponse.json({
                    message: 'Recharging failed',
                }, { status: 400 });
            }
            case 'multitouch':
                const multitouchResult = await multitouch(userId);
                if (multitouchResult) {
                return NextResponse.json({
                    message: 'Multitouch activated',
                    booster: booster,
                    user: multitouchResult
                });
            } else {
                return NextResponse.json({
                    message: 'Multitouch a failed',
                }, { status: 400 });
            }
            default:
                return NextResponse.json({
                    message: 'Booster not found',
                }, { status: 400 });
        }
    }   else {
        return NextResponse.json({ message: 'Недействительный токен' }, { status: 401 });
    }
}
