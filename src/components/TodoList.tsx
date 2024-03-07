import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "../hooks";

const TodoList = () => {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const handleChange = (id: number, checked: boolean) => {
    dispatch({ type: "todos/toggleTodo", payload: { id, checked } });
  };

  return (
    <div>
      <ul>
        {todos.map(({ id, text, checked }) => (
          <li key={id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => handleChange(id, e.target.checked)}
                />
              }
              label={text}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
