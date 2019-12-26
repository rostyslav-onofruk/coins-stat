export interface Coin {
    id: number;
    rank: number;
    type: string;
    websiteUrl: string;
    color: string;
    description: string;
    name: string;
    iconUrl: string;
    symbol: string;
    history: string[];
    allTimeHigh: AllTimeHigh
}

export interface AllTimeHigh {
    price: string;
    timestamp: number;
}