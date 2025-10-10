export interface GameConfig {
  id: number;
  cardSelection: "seq" | "rand";
  timeForACard?: number;
}
