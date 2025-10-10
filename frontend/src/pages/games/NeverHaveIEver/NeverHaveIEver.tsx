import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Card } from "../../../types/cards";
import type { GameConfig } from "../../../types/gameConfig";
import { shuffleArray } from "../../../utils/shuffleArray";
import NoCardsLeftBlock from "../../../components/CardBlock/NoCardsLeftBlock";
import styles from "./NeverHaveIEver.module.scss";

interface NeverHaveIEverProps {
  gameConfig: GameConfig;
  cards: Card[];
}

const NeverHaveIEver = ({ gameConfig, cards }: NeverHaveIEverProps) => {
  const [playerTurn, setPlayerTurn] = useState<1 | 2>(1);
  const [remainingCards, setRemainingCards] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    if (!cards || cards.length === 0) return;

    const deck =
      gameConfig.cardSelection === "rand" ? shuffleArray(cards) : cards;
    setRemainingCards(deck);
    setCurrentCard(deck[0]);
  }, [cards, gameConfig]);

  const handleNextTurn = () => {
    if (!remainingCards.length) return;

    setSwipeDirection(playerTurn === 1 ? "right" : "left");

    setTimeout(() => {
      const newDeck = remainingCards.slice(1);
      setRemainingCards(newDeck);

      if (newDeck.length > 0) {
        setCurrentCard(newDeck[0]);
      } else {
        setCurrentCard(null);
      }

      setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
    }, 300);
  };

  if (!remainingCards.length && !currentCard) {
    return <NoCardsLeftBlock />;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Ход игрока {playerTurn}</h2>

      <AnimatePresence mode="wait">
        {currentCard && (
          <motion.div
            key={currentCard.id}
            className={styles.card}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              x: swipeDirection === "right" ? 150 : -150,
              rotate: swipeDirection === "right" ? 10 : -10,
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h3 className={styles.cardTitle}>Я никогда не...</h3>
            <p className={styles.cardText}>{currentCard.description}</p>

            <button
              className={styles.nextTurnBtn}
              onClick={handleNextTurn}
            >
              Передать ход ➡️
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NeverHaveIEver;
