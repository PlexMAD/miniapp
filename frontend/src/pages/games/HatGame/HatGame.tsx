import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./HatGame.module.scss";
import { shuffleArray } from "../../../utils/shuffleArray";
import NoCardsLeftBlock from "../../../components/CardBlock/NoCardsLeftBlock";
import type { Card } from "../../../types/cards";
import type { GameConfig } from "../../../types/gameConfig";

const HatGame = ({
  cards,
  gameConfig,
}: {
  cards: Card[];
  gameConfig: GameConfig;
}) => {
  const [teamScores, setTeamScores] = useState({ team1: 0, team2: 0 });
  const [currentTeam, setCurrentTeam] = useState<1 | 2>(1);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [remainingCards, setRemainingCards] = useState<Card[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [finalPhase, setFinalPhase] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [turnActive, setTurnActive] = useState(false);
  const [turnEnded, setTurnEnded] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const turnTime = gameConfig.turnTime ?? 30;

  const determineWinner = useCallback(() => {
    if (teamScores.team1 > teamScores.team2) {
      setWinner("Команда 1");
    } else if (teamScores.team2 > teamScores.team1) {
      setWinner("Команда 2");
    } else {
      setWinner("Ничья");
    }
    setGameOver(true);
  }, [teamScores.team1, teamScores.team2]);

  useEffect(() => {
    if (cards && cards.length > 0) {
      const shuffled = shuffleArray(cards);
      setRemainingCards(shuffled);
      setCurrentCard(shuffled[0]);
    }
  }, [cards]);

  const nextCard = useCallback(() => {
    if (remainingCards.length <= 1) {
      setRemainingCards([]);
      setCurrentCard(null);
      return;
    }
    const newDeck = remainingCards.slice(1);
    setRemainingCards(newDeck);
    setCurrentCard(newDeck[0]);
  }, [remainingCards]);

  const handleGuess = useCallback(
    (choice: boolean, currentTeam: 1 | 2) => {
      setTeamScores((prev) => {
        const newScores = { ...prev };
        const delta = choice ? 3 : -1;
        if (currentTeam === 1) newScores.team1 += delta;
        else newScores.team2 += delta;

        if (!finalPhase && newScores.team1 >= 10) {
          setFinalPhase(true);
        }

        return newScores;
      });

      nextCard();
    },
    [nextCard, finalPhase]
  );

  const startTurn = useCallback(() => {
    setTurnActive(true);
    setTurnEnded(false);
    setTimeLeft(turnTime);
  }, [turnTime]);

  useEffect(() => {
    if (!turnActive) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (!prev) return prev;
        if (prev > 1) return prev - 1;

        clearInterval(timerRef.current!);
        setTurnActive(false);
        setTurnEnded(true);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [turnActive]);

  useEffect(() => {
    if (!turnEnded) return;

    const timeout = setTimeout(() => {
      if (finalPhase && currentTeam === 2) {
        determineWinner();
        return;
      }

      if (finalPhase && currentTeam === 1) {
        setCurrentTeam(2);
        setTurnEnded(false);
        return;
      }

      setCurrentTeam((prev) => (prev === 1 ? 2 : 1));
      setTurnEnded(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [turnEnded, finalPhase, currentTeam, determineWinner]);

  if (gameOver) {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>🏆 Игра окончена!</h2>
        <p className={styles.text}>
          {winner === "Ничья" ? "Ничья!" : `${winner} победила! 🎉`}
        </p>
        <p className={styles.score}>
          Команда 1: {teamScores.team1} — Команда 2: {teamScores.team2}
        </p>
      </div>
    );
  }

  if (!currentCard) {
    return <NoCardsLeftBlock />;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        {finalPhase && currentTeam === 2
          ? "⚔ Финальная фаза!"
          : `Ход команды ${currentTeam}`}
      </h2>
      <p className={styles.scoreboard}>
        Команда 1: {teamScores.team1} | Команда 2: {teamScores.team2}
      </p>

      {turnEnded && (
        <motion.div
          className={styles.timeUp}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          ⏰ Время вышло!
        </motion.div>
      )}

      {turnActive ? (
        <>
          <div className={styles.timer}>⏳ Осталось: {timeLeft} сек</div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className={styles.cardWord}>{currentCard.title}</h3>
              <p className={styles.cardDescription}>
                {currentCard.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className={styles.buttons}>
            <button
              className={styles.correctBtn}
              onClick={() => handleGuess(true, currentTeam)}
            >
              ✅ Отгадал (+3)
            </button>
            <button
              className={styles.skipBtn}
              onClick={() => handleGuess(false, currentTeam)}
            >
              🔄 Следующая (-1)
            </button>
          </div>
        </>
      ) : (
        !turnEnded && (
          <div className={styles.preTurn}>
            <p className={styles.waitingText}>
              Команда {currentTeam}, приготовьтесь к своему ходу!
            </p>
            <button className={styles.startBtn} onClick={startTurn}>
              ▶️ Начать
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default HatGame;
