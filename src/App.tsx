import { Provider } from "react-redux";
import { store } from "./store";
import TimerContainer from "./components/TimerContainer";
import Todos from "./components/Todos";
import Uploader from "./components/Uploader";
import Wallpaper from "./components/Wallpaper";

function App() {
  return (
    <Provider store={store}>
      <Wallpaper>
        <TimerContainer />
        <Todos />
        <Uploader />
      </Wallpaper>
    </Provider>
  );
}

export default App;
