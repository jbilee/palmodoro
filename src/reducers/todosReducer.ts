import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: number;
  text: string;
  checked: boolean;
};

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: state.length,
        text: action.payload,
        checked: false,
      };
      return [...state, newTodo];
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const remainingTodos = state.filter((state) => state.id !== action.payload);
      return [...remainingTodos];
    },
    toggleTodo: (state, action: PayloadAction<{ id: number; checked: boolean }>) => {
      const [target] = state.filter((state) => state.id === action.payload.id);
      target.checked = action.payload.checked;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
