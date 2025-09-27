// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const tg = window.Telegram.WebApp;

export const useTelegram = () => {
  const onClose = () => {
    tg.close();
  };
  return {
    tg,
    user: tg.initDataUnsafe?.user?.userName,
    onClose,
  };
};
