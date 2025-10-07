import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Game } from "../../types/games";
import styles from "./GameLayout.module.scss";
import GamePage from "../../pages/GamePage/GamePage";

const fetchGame = async (gameId: number): Promise<Game> => {
  const response = await fetch(`http://localhost:5000/games/${gameId}`);
  if (!response.ok) {
    throw new Error("Something went wrong while fetching the game");
  }
  return response.json();
};

const GameLayout = () => {
  const { gameId } = useParams();

  const {
    data: gameInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => fetchGame(Number(gameId)),
    enabled: !!gameId,
  });

  if (isLoading) {
    return <div className={styles.wrapper}>Загрузка...</div>;
  }

  if (isError) {
    return (
      <div className={styles.wrapper}>Ошибка: {(error as Error).message}</div>
    );
  }

  if (!gameInfo) {
    return <div className={styles.wrapper}>Игра не найдена</div>;
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>{gameInfo.title}</h1>
      </header>

      <main className={styles.main}>
        <GamePage gameInfo={gameInfo} />
      </main>
    </div>
  );
};

export default GameLayout;
