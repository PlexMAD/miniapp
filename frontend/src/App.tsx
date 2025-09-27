import { useEffect } from 'react';
import './App.css'
import MainPage from './pages/MainPage/MainPage';
import DefaultLayout from './layouts/DefaultLayout';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const tg = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    tg.ready()
  }, []);
  const onClose = () => {
    tg.close()
  }
  return (
    <>
      <div className='text-3xl font-bold underline'>sdjnaujnids</div>
      <button onClick={onClose}>asddas</button>
      <DefaultLayout>
        <MainPage />
      </DefaultLayout>
    </>
  )
}

export default App
