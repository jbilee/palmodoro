import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getStorage, saveToStorage } from "../utils/utilities";

type Todo = {
  id: number;
  text: string;
  checked: boolean;
};

const initialState = getStorage<Todo[]>("palmo-t") || [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        checked: false,
      };
      saveToStorage([...state, newTodo], "palmo-t");
      return [...state, newTodo];
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const remainingTodos = state.filter((state) => state.id !== action.payload);
      saveToStorage(remainingTodos, "palmo-t");
      return [...remainingTodos];
    },
    toggleTodo: (state, action: PayloadAction<{ id: number; checked: boolean }>) => {
      const [target] = state.filter((state) => state.id === action.payload.id);
      target.checked = action.payload.checked;
      saveToStorage(state, "palmo-t");
    },
    clearTodos: () => {
      saveToStorage([], "palmo-t");
      return [];
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, clearTodos } = todosSlice.actions;
export default todosSlice.reducer;
