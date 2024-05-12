export interface HeroItemCard {
    id: number;
    name?: string;
    imgProfile?: string;
    imgLarge?: string;
    race: string;
    alias?: string;
    powers?: Powers;
}

interface Powers {
    intelligence?: number;
    strength?: number;
    speed?: number;
    durability?: number;
    power?: number;
    combat?: number;
}