export interface Game {
  id: number;
  title: string;
  description: string;
  gameCategoryId: number;
  premiumStatus?: boolean;
  configId: number;
}
