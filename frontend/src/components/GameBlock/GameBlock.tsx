import type { Game } from "../../types/games";
import styles from "./GameBlock.module.scss";
export const GameBlock = ({ gameTitle, description }: Game) => {
  return (
    <div className={styles.gameBlock}>
      <h2 className="text-center font-bold">{gameTitle}</h2>
      <p>{description}</p>
    </div>
  );
};

export default GameBlock;
