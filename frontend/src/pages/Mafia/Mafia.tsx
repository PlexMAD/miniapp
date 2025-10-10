import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Mafia.module.scss";
import type { Card } from "../../types/cards";
import NoCardsLeftBlock from "../../components/CardBlock/NoCardsLeftBlock";

const HOLD_DURATION = 2000;

const Mafia = ({ cards }: { cards: Card[] }) => {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [rolesDeck, setRolesDeck] = useState<Card[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSetPlayers = (count: number) => {
    if (count < 5 || count > 10) return;
    setPlayerCount(count);
  };

  useEffect(() => {
    if (!playerCount || cards.length === 0) return;

    const sheriff = cards.find((c) => c.title === "Шериф");
    const don = cards.find((c) => c.title === "Дон");
    const mafia = cards.find((c) => c.title === "Мафия");
    const peaceful = cards.find((c) => c.title === "Мирный");
    if (!sheriff || !don || !mafia || !peaceful) return;

    const total = playerCount;
    const mafiaCount = total >= 9 ? 3 : total >= 7 ? 2 : 1;
    const peacefulCount = total - (mafiaCount + 2);

    const deck = [
      sheriff,
      don,
      ...Array(mafiaCount).fill(mafia),
      ...Array(peacefulCount).fill(peaceful),
    ];
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setRolesDeck(shuffled);
    setCurrentPlayer(1);
    setRevealed(false);
    setCurrentCard(null);
  }, [playerCount, cards]);

  const handleHoldStart = () => {
    if (revealed || !rolesDeck.length) return;
    setHolding(true);
    setProgress(0);

    const startTime = Date.now();

    progressTimer.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min(1, elapsed / HOLD_DURATION));
    }, 16);

    holdTimer.current = setTimeout(() => {
      setRevealed(true);
      setCurrentCard(rolesDeck[currentPlayer - 1]);
      setHolding(false);
      clearInterval(progressTimer.current!);
      setProgress(1);
    }, HOLD_DURATION);
  };

  const handleHoldEnd = () => {
    clearTimeout(holdTimer.current!);
    clearInterval(progressTimer.current!);
    if (!revealed) {
      setHolding(false);
      setProgress(0);
    }
  };

  const handleNext = () => {
    setRevealed(false);
    setCurrentCard(null);
    setHolding(false);
    setProgress(0);
    if (playerCount && currentPlayer >= playerCount) {
      setRolesDeck([]);
      setCurrentPlayer((prev) => prev + 1);
    } else {
      setCurrentPlayer((prev) => prev + 1);
    }
  };

  if (playerCount && currentPlayer > playerCount) {
    return (
      <NoCardsLeftBlock
        title="Роли получены!"
        description="Можете начинать игру"
      />
    );
  }

  if (!playerCount) {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Введите количество игроков</h2>
        <div className={styles.buttons}>
          {[5, 6, 7, 8, 9, 10].map((n) => (
            <button
              key={n}
              className={styles.numberBtn}
              onClick={() => handleSetPlayers(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Игрок {currentPlayer} из {playerCount}
      </h2>

      <AnimatePresence mode="wait">
        {currentCard && revealed ? (
          <motion.div
            key={currentCard.id}
            className={styles.cardRevealed}
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.cardTitle}>{currentCard.title}</h3>
            <p className={styles.cardText}>{currentCard.description}</p>

            <button className={styles.nextBtn} onClick={handleNext}>
              Передать ход следующему игроку ➡️
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="hidden"
            className={styles.cardHidden}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className={styles.hiddenText}>Роль скрыта</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!revealed && (
        <button
          className={styles.holdBtn}
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onMouseLeave={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
        >
          <span
            className={styles.fill}
            style={{ width: `${progress * 100}%` }}
          />
          <span className={styles.label}>
            {holding ? "Держите..." : "Открыть роль (удерживайте 2 сек)"}
          </span>
        </button>
      )}
    </div>
  );
};

export default Mafia;
