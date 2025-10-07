import { useCallback, useState } from "react";
import classNames from "classnames";
import type { Game } from "../../types/games";
import styles from "./GameBlock.module.scss";
import { Link } from "react-router-dom";

export const GameBlock = ({ title, description, id }: Game) => {
  const [flipped, setFlipped] = useState(false);
  const clickGame = useCallback(() => {
    setFlipped(!flipped);
  }, [flipped]);
  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.card, { [styles.flipped]: flipped })}
        onClick={clickGame}
      >
        <div className={styles.front}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.hint}>
            Нажми, чтобы узнать правила и начать игру
          </span>
        </div>
        <div className={styles.back}>
          <p>{description}</p>
          <Link to={`playgame/${id}`}>
            <button className={styles.playButton}>Играть</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameBlock;
