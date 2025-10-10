export interface GameConfig {
  id: number;
  cardSelection: "seq" | "rand";
  turnTime?: number;
}
