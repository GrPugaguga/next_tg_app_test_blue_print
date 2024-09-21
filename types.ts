export interface User {
    id: number;
    username: string;
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
    // daily_streak: number;
    // boost: {}[]
}
export interface Upgrade {
    cost: number;
    upgrade_price: number;
    lvl: number;
    points_per_second: number;
    points_per_click: number;
    max_energy: number;
}
