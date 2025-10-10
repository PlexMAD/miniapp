import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Card } from "../../../types/cards";
import type { GameConfig } from "../../../types/gameConfig";
import { shuffleArray } from "../../../utils/shuffleArray";
import styles from "./TruthOrDare.module.scss";
import NoCardsLeftBlock from "../../../components/CardBlock/NoCardsLeftBlock";

interface TruthOrDareProps {
  gameConfig: GameConfig;
  cards: Card[];
}

const TruthOrDare = ({ gameConfig, cards }: TruthOrDareProps) => {
  const [truthCards, setTruthCards] = useState<Card[]>([]);
  const [dareCards, setDareCards] = useState<Card[]>([]);
  const [playerTurn, setPlayerTurn] = useState<1 | 2>(1);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  useEffect(() => {
    if (!cards || cards.length === 0) return;

    const truths = cards.filter(
      (card) => card.title?.toLowerCase() === "правда"
    );
    const dares = cards.filter(
      (card) => card.title?.toLowerCase() === "действие"
    );

    if (gameConfig.cardSelection === "rand") {
      setTruthCards(shuffleArray(truths));
      setDareCards(shuffleArray(dares));
    } else {
      setTruthCards(truths);
      setDareCards(dares);
    }
  }, [cards, gameConfig]);

  const handleChoice = (type: "truth" | "dare") => {
    const pool = type === "truth" ? truthCards : dareCards;
    if (pool.length === 0) {
      setCurrentCard({
        id: -1,
        title: type === "truth" ? "Правда" : "Действие",
        description: "Карточки закончились 😿",
        gameId: -1,
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex];
    setCurrentCard(selected);

    if (type === "truth") {
      setTruthCards((prev) => prev.filter((_, i) => i !== randomIndex));
    } else {
      setDareCards((prev) => prev.filter((_, i) => i !== randomIndex));
    }
  };

  const handleNextTurn = () => {
    setCurrentCard(null);
    setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
  };

  const cardType =
    currentCard?.title?.toLowerCase() === "правда"
      ? styles.truthCard
      : currentCard?.title?.toLowerCase() === "действие"
      ? styles.dareCard
      : "";

  if ((truthCards.length === 0 || dareCards.length === 0) && !currentCard) {
    return <NoCardsLeftBlock />;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Ход игрока {playerTurn}</h2>

      {!currentCard && (
        <div className={styles.buttons}>
          <button
            className={styles.truthBtn}
            onClick={() => handleChoice("truth")}
          >
            Правда
          </button>
          <button
            className={styles.dareBtn}
            onClick={() => handleChoice("dare")}
          >
            Действие
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentCard && (
          <motion.div
            key={currentCard.id}
            className={`${styles.card} ${cardType}`}
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h3 className={styles.cardTitle}>{currentCard.title}</h3>
            <p className={styles.carddescription}>{currentCard.description}</p>
            <button className={styles.nextTurnBtn} onClick={handleNextTurn}>
              Передать ход ➡️
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TruthOrDare;
