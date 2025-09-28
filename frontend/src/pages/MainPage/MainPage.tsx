import GamesCategoryBlock from "../../components/GamesCategoryBlock/GamesCategoryBlock";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import type { Game } from "../../types/games";
import styles from "./Mainpage.module.scss";

export const MainPage = () => {
  return (
    <>
      <div className={styles.header}>
        <PageHeader>Список игр</PageHeader>
      </div>
      <GamesCategoryBlock
        title="Классика для компаний"
        games={
          [
            {
              gameTitle: "Правда или действие",
              description: "Карточки с вопросами и заданиями",
            },
            {
              gameTitle: "Я никогда не…",
              description:
                "Карточки с утверждениями, игроки отмечают, делали ли это",
            },
          ] as Game[]
        }
      />
    </>
  );
};

export default MainPage;
