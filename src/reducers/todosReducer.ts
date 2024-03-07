import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: number;
  text: string;
  checked: boolean;
};

const initialState: Todo[] = [
  { id: 1, text: "hey", checked: false },
  { id: 2, text: "babo", checked: false },
  { id: 3, text: ":)", checked: true },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      return [...state, action.payload];
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const newTodos = state.filter((state) => state.id !== action.payload);
      return [...newTodos];
    },
    toggleTodo: (
      state,
      action: PayloadAction<{ id: number; checked: boolean }>
    ) => {
      const [target] = state.filter((state) => state.id === action.payload.id);
      target.checked = action.payload.checked;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
