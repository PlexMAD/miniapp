import { useState } from "react";
import classNames from "classnames";
import type { Game } from "../../types/games";
import styles from "./GameBlock.module.scss";

export const GameBlock = ({ title, description }: Game) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.card, { [styles.flipped]: flipped })}
        onClick={() => setFlipped(!flipped)}
      >
        <div className={styles.front}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.hint}>Нажми, чтобы узнать правила</span>
        </div>
        <div className={styles.back}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default GameBlock;
