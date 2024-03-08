import { Provider } from "react-redux";
import { store } from "./store";
import Todos from "./components/Todos";
import TimerContainer from "./components/TimerContainer";

function App() {
  return (
    <Provider store={store}>
      <TimerContainer />
      <Todos />
    </Provider>
  );
}

export default App;
