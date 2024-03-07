import { Provider } from "react-redux";
import TodoList from "./components/TodoList";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;
