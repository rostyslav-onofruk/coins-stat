export interface ShortCoin {
    id: number;
    name: string;
    iconUrl: string;
    rank: number;
    websiteUrl: string;
    color: string;
    description: string;
}

export interface FullCoin extends ShortCoin {
    history: History[];
}

export interface History {
    price: string;
    timestamp: number;
}