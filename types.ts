export interface User {
    id: number;
    username: string;
    total_points: number;
    avatar: string;
    points: number;
    energy: number;
    last_sync_timestamp: number;
    max_energy: number;
    energy_per_second: number;
    points_per_click: number;
    points_per_second: number;
    refer_parent_id: number | null;
    referal_link: string;
    referalsIds: number[];
    upgrades: {id:string, level:number}[];
    connected_address: string | null;
    daily_streak: {
        count:number,
        last_claim_time:Date | number
    };
    boosters:{multitouch:{count:number}, recharge:{count:number}}
    booster_expirated_time?:number
}



export interface Upgrade {
    cost: number;
    upgrade_price: number;
    lvl: number;
    points_per_second: number;
    points_per_click: number;
    max_energy: number;
}
