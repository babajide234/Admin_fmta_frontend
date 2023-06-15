import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.css";
import "./assets/font/stylesheet.css";
import "./scss/style.scss";
import loaderSlice from "./store/loaderStore";
import LoadingModal from "./components/Modal/LoadingModal";

function App() {
  const loader = loaderSlice((state) => state.loader);
  return (
    <>
      <LoadingModal open={loader} loading={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
