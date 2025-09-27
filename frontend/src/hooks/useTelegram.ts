// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const tg = window.Telegram.WebApp;

export const useTelegram = () => {
  const onClose = () => {
    tg.close();
  };
  return {
    tg,
    userFirstName: tg.initDataUnsafe?.user?.first_name,
    onClose,
  };
};
