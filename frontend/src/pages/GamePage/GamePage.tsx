import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Game } from "../../types/games";
import type { Card } from "../../types/cards";
import styles from "./GamePage.module.scss";
import type { GameConfig } from "../../types/gameConfig";
import CardBlock from "../../components/CardBlock/CardBlock";

const fetchCards = async (gameId: number): Promise<Card[]> => {
  const res = await fetch(
    `http://localhost:5000/cards/get-cards-by-game/${gameId}`
  );
  if (!res.ok) throw new Error("Something went wrong while fetching cards");
  return res.json();
};

const fetchConfig = async (configId: number): Promise<GameConfig> => {
  const res = await fetch(`http://localhost:5000/configs/${configId}`);
  if (!res.ok) throw new Error("Something went wrong while fetching config");
  return res.json();
};

const GamePage = ({
  gameInfo,
  configId,
}: {
  gameInfo: Game;
  configId: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [finished, setFinished] = useState(false);
  const [triggerSwipe, setTriggerSwipe] = useState(false);
  const navigate = useNavigate();

  const { data: cards, isLoading: cardsLoading } = useQuery<Card[]>({
    queryKey: ["cards", gameInfo.id],
    queryFn: () => fetchCards(gameInfo.id),
  });

  const { data: config, isLoading: configLoading } = useQuery<GameConfig>({
    queryKey: ["config", configId],
    queryFn: () => fetchConfig(configId),
  });

  const nextCard = useCallback(() => {
    if (!cards || !config) return;
    if (config.cardSelection === "rand") {
      const randomIndex = Math.floor(Math.random() * cards.length);
      setCurrentCard(cards[randomIndex]);
    } else {
      if (currentIndex + 1 >= cards.length) setFinished(true);
      else {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setCurrentCard(cards[nextIndex]);
      }
    }
  }, [cards, config, currentIndex]);

  useEffect(() => {
    if (cards && cards.length > 0 && config) {
      setCurrentCard(
        config.cardSelection === "rand"
          ? cards[Math.floor(Math.random() * cards.length)]
          : cards[0]
      );
    }
  }, [cards, config]);

  if (cardsLoading || configLoading) return <div>Загрузка...</div>;
  if (!cards?.length) return <div>Карточки не найдены</div>;
  if (!config) return <div>Конфиг не найден</div>;

  if (finished)
    return (
      <div className={styles.wrapper}>
        <div className={styles.cardBox}>
          <h2 className={styles.cardTitle}>Карточки закончились</h2>
          <p className={styles.cardDescription}>Вы прошли все задания!</p>
        </div>
        <button className={styles.nextBtn} onClick={() => navigate("/")}>
          Вернуться на главный экран
        </button>
      </div>
    );

  const handleNext = () => {
    setTriggerSwipe(true);
  };

  return (
    <div className={styles.wrapper}>
      {currentCard && (
        <CardBlock
          card={currentCard}
          triggerSwipe={triggerSwipe}
          onAnimationEnd={() => {
            nextCard();
            setTriggerSwipe(false);
          }}
        />
      )}

      <button
        className={styles.nextBtn}
        onClick={handleNext}
        disabled={triggerSwipe}
      >
        Следующая карточка
      </button>
    </div>
  );
};

export default GamePage;
