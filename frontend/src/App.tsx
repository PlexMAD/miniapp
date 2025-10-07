import "./App.css";
import MainPage from "./layouts/MainPage/MainPage";
import DefaultLayout from "./layouts/DefaultLayout";
import { useTelegram } from "./hooks/useTelegram";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    element: <span>play some game</span>,
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
