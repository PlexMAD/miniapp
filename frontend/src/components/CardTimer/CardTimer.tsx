import { useEffect, useState } from "react";
import styles from "./CardTimer.module.scss";

interface CardTimerProps {
  duration: number;
  onExpire: () => void;
  resetTrigger: unknown;
}

const CardTimer = ({ duration, onExpire, resetTrigger }: CardTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, resetTrigger]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  return (
    <div className={styles.timer}>
      ⏳ Осталось времени: <strong>{timeLeft}</strong> сек
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${(timeLeft / duration) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CardTimer;
