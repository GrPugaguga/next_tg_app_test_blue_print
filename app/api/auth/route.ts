import { NextResponse } from "next/server";
import getUserData from "../../lib/getUserData";
import createUser from "../../lib/createUser";
import { User } from "../../../types";

export async function POST(request: Request) {
        const { id,username,ref} = await request.json();
        console.log(id,username,ref, 'from api/auth/route.ts')
        if(!id || !username) return NextResponse.json({
            message: 'error',
            user: null
        });    
        const userData = await getUserData(id);
        try {
        if (userData ) {
            return NextResponse.json({
                message: 'success',
                user: userData
            });
        } else {
            const newUser:User = {
                id: Number(id),
                username: username,
                avatar: '',
                total_points: ref && ref !== id ? 1000 : 0,
                points: ref && ref !== id ? 1000 : 0,
                energy: 1000,
                last_sync_timestamp: Date.now(),
                max_energy: 1000,
                energy_per_second: 1,
                points_per_click: 1,
                points_per_second: 1,
                refer_parent_id: ref && ref !== id ? ref : null,
                referal_link: id,
                referalsIds: [],
                upgrades: [],
                connected_address:null,
                daily_streak:{count:0,last_claim_time:0},
                boosters:{
                    multitouch:{count:ref && ref !== id ? 3 : 2,},
                    recharge:{count:ref && ref !== id ? 3 : 2,},
                },
            }
            const response = await createUser(newUser);
            if (response) {
                return NextResponse.json({
                    message: 'success', 
                    user: newUser
                });
            } else{ 
                return NextResponse.json({
                    message: 'error',
                    user: null
                });
            }
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        throw error;
}
}