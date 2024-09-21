import { NextResponse } from "next/server";
import getUserData from "../../lib/getUserData";
import createUser from "../../lib/createUser";
import { User } from "../../../types";

export async function POST(request: Request) {
        const { id,username} = await request.json();
        console.log(id,username, 'from api/auth/route.ts')
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
                points: 0,
                energy: 1000,
                last_sync_timestamp: Date.now(),
                max_energy: 1000,
                energy_per_second: 1,
                points_per_click: 1,
                points_per_second: 1,
                refer_parent_id: null,
                referal_link: id,
                referalsIds: [],
                upgrades: [],
                connected_address:null
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