import type { Game } from "../../types/games";
import GameBlock from "../GameBlock/GameBlock";

interface GamesCategoryBlockProps {
  title: string;
  games: Game[];
}

export const GamesCategoryBlock = ({
  title,
  games,
}: GamesCategoryBlockProps) => {
  return (
    <>
      <h2 className="text-center text-2xl">{title}</h2>
      {games.map((game) => (
        <GameBlock
          key={game.gameTitle}
          gameTitle={game.gameTitle}
          description={game.description}
        />
      ))}
    </>
  );
};

export default GamesCategoryBlock;
