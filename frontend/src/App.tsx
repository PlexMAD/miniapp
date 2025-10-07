import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { useTelegram } from "./hooks/useTelegram";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameLayout from "./layouts/GameLayout/GameLayout";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const tg = window.Telegram.WebApp;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DefaultLayout>
        <MainPage />
      </DefaultLayout>
    ),
  },
  {
    path: "playgame/:gameId",
    element: <GameLayout />,
  },
]);

function App() {
  const { onClose } = useTelegram();
  useEffect(() => {
    if (tg) {
      tg.ready(); // Инициализируем Web App
      tg.expand(); // Разворачиваем на полный экран (опционально)
    }
  }, []);
  return (
    <>
      <button onClick={onClose}></button>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
