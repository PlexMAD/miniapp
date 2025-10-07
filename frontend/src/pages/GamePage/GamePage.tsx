import type { Game } from "../../types/games";
import type { Card } from "../../types/cards";
import { useQuery } from "@tanstack/react-query";

const fetchCards = async (gameId: number): Promise<Card[]> => {
  const response = await fetch(
    `http://localhost:5000/cards/get-cards-by-game/${gameId}`
  );
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

const GamePage = ({ gameInfo }: { gameInfo: Game }) => {
  const {
    data: cards,
    isLoading,
    error,
  } = useQuery<Card[]>({
    queryKey: ["cards", gameInfo.id],
    queryFn: () => fetchCards(gameInfo.id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>{error.message}</div>;
  console.log(cards);

  return (
    <div>
      <ul>
        {cards?.map((card) => (
          <li key={card.id}>{card.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GamePage;
