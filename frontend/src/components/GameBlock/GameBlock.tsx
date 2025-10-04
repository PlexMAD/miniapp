import { useState } from "react";
import type { Game } from "../../types/games";
import styles from "./GameBlock.module.scss";

export const GameBlock = ({
  title,
  description,
}: Game) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      className={styles.gameBlock}
      onMouseEnter={() => setIsPressed(true)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
    >
      <h2 className={styles.gameTitle} style={{ opacity: isPressed ? 0 : 1 }}>
        {title}
      </h2>
      <p
        className={styles.gameDescription}
        style={{ opacity: isPressed ? 1 : 0 }}
      >
        {description}
      </p>
    </div>
  );
};

export default GameBlock;
