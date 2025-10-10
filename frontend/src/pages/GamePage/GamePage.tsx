import type { Game } from "../../types/games";
import type { Card } from "../../types/cards";
import type { GameConfig } from "../../types/gameConfig";
import { useQuery } from "@tanstack/react-query";
import styles from "./GamePage.module.scss";
import { GAME_COMPONENTS } from "../../gameRegistry/gameRegistry";
import { useMemo } from "react";

const fetchCards = async (gameId: number): Promise<Card[]> => {
  const res = await fetch(
    `http://localhost:5000/cards/get-cards-by-game/${gameId}`
  );
  if (!res.ok) throw new Error("Ошибка при загрузке карточек");
  return res.json();
};

const fetchConfig = async (configId: number): Promise<GameConfig> => {
  const res = await fetch(`http://localhost:5000/configs/${configId}`);
  if (!res.ok) throw new Error("Ошибка при загрузке конфига");
  return res.json();
};

const GamePage = ({
  gameInfo,
  configId,
}: {
  gameInfo: Game;
  configId: number;
}) => {
  const {
    data: cards,
    isLoading: cardsLoading,
    isError: cardsError,
  } = useQuery<Card[]>({
    queryKey: ["cards", gameInfo.id],
    queryFn: () => fetchCards(gameInfo.id),
  });

  const {
    data: config,
    isLoading: configLoading,
    isError: configError,
  } = useQuery<GameConfig>({
    queryKey: ["config", configId],
    queryFn: () => fetchConfig(configId),
  });
  console.log(gameInfo.slug);
  const GameComponent = useMemo(() => {
    return GAME_COMPONENTS[gameInfo.slug ?? ""];
  }, [gameInfo.slug]);

  if (cardsLoading || configLoading) {
    return (
      <div className={styles.statusWrapper}>
        <div className={styles.loader}></div>
        <p className={styles.statusText}>Загрузка игры...</p>
      </div>
    );
  }

  if (cardsError || configError || !cards || !config || cards.length === 0) {
    return (
      <div className={styles.statusWrapper}>
        <h2 className={styles.errorTitle}>😿 Ошибка загрузки данных</h2>
        <p className={styles.statusText}>
          Не удалось получить данные игры. Попробуйте перезагрузить страницу.
        </p>
      </div>
    );
  }
  console.log(GameComponent);
  if (!GameComponent) {
    return (
      <div className={styles.statusWrapper}>
        <h2 className={styles.errorTitle}>Игра не найдена</h2>
        <p className={styles.statusText}>
          Компонент для игры <strong>{gameInfo.slug}</strong> не
          зарегистрирован.
        </p>
      </div>
    );
  }

  return <GameComponent gameConfig={config} cards={cards} />;
};

export default GamePage;
