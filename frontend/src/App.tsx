import { useEffect } from 'react';
import './App.css'
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
    </>
  )
}

export default App
