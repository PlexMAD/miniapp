import { useState, useEffect } from "react";
import type { Card } from "../../types/cards";
import styles from "./CardBlock.module.scss";

interface CardBlockProps {
  card: Card;
  triggerSwipe?: boolean;
  direction?: "left" | "right";
  onAnimationEnd?: () => void;
}

const CardBlock = ({
  card,
  triggerSwipe,
  direction = "left",
  onAnimationEnd,
}: CardBlockProps) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (triggerSwipe) {
      setAnimating(true);
      const timeout = setTimeout(() => {
        setAnimating(false);
        onAnimationEnd?.();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [triggerSwipe, onAnimationEnd]);

  return (
    <div
      className={`${styles.card} ${
        animating
          ? direction === "left"
            ? styles.swipeLeft
            : styles.swipeRight
          : ""
      }`}
    >
      <h2 className={styles.title}>{card.title}</h2>
      <p className={styles.description}>{card.description}</p>
    </div>
  );
};

export default CardBlock;
