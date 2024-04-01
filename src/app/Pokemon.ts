export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  url?: string;
  types: string[];
  weight?: number;
  height?: number;
  stats?: { name: string; value: number }[];
  abilities?: string[];
  cry?: string;
}
