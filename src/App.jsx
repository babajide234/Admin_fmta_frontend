
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import './App.css'
import "./assets/font/stylesheet.css";
import "./scss/style.scss";

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
