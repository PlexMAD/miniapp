import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import DefaultLayout from "./layouts/DefaultLayout";
import { useTelegram } from "./hooks/useTelegram";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const tg = window.Telegram.WebApp;

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
      <DefaultLayout>
        <MainPage />
      </DefaultLayout>
    </>
  );
}

export default App;
