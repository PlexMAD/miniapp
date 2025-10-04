import { useQuery } from "@tanstack/react-query";
import GamesCategoryBlock from "../../components/GamesCategoryBlock/GamesCategoryBlock";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import type { Game } from "../../types/games";
import styles from "./Mainpage.module.scss";
import type { GameCategory } from "../../types/gameCategories";

const fetchGameCategories = async () => {
  const responce = await fetch("http://localhost:5000/gameCategories");
  if (!responce.ok) {
    throw new Error("Something went wrong");
  }
  return responce.json();
};

const fetchGames = async () => {
  const responce = await fetch("http://localhost:5000/games");
  if (!responce.ok) {
    throw new Error("Something went wrong");
  }
  return responce.json();
};

export const MainPage = () => {
  const { data: gameCategories } = useQuery<GameCategory[]>({
    queryKey: ["gameCategories"],
    queryFn: fetchGameCategories,
  });
  const { data: games } = useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: fetchGames,
  });
  return (
    <>
      <div className={styles.header}>
        <PageHeader>Список игр</PageHeader>
      </div>
      {gameCategories?.map((gameCategory) => (
        <GamesCategoryBlock
          key={gameCategory.id}
          title={gameCategory.title}
          games={
            games?.filter((game) => {
              return game.gameCategoryId === gameCategory.id;
            }) || []
          }
        />
      ))}
    </>
  );
};

export default MainPage;
