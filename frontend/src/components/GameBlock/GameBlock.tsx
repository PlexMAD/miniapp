import type { Game } from "../../types/games";
import styles from "./GameBlock.module.scss";
export const GameBlock = ({ gameTitle, description }: Game) => {
  return (
    <div className={styles.gameBlock}>
      <h2 className={styles.gameTitle}>{gameTitle}</h2>
      <p className={styles.gameDescription}>{description}</p>
    </div>
  );
};

export default GameBlock;
