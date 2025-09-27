import { useEffect } from 'react';
import './App.css'
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
      <div>sdjnaujnids</div>
      <button onClick={onClose}>asddas</button>
    </>
  )
}

export default App
