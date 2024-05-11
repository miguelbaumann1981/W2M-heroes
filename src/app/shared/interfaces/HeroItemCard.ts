export interface HeroItemCard {
    id: number;
    name?: string;
    imgProfile?: string;
    imgLarge?: string;
    race: string;
    alias?: string;
    powers?: Power;
}

interface Power {
    intelligence?: number;
    strength?: number;
    speed?: number;
    durability?: number;
    power?: number;
    combat?: number;
}