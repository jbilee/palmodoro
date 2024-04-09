import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleTodo } from "../reducers/todosReducer";

const TodoList = () => {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const handleChange = (id: number, checked: boolean) => {
    dispatch(toggleTodo({ id, checked }));
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
                  onChange={(e) => handleChange(id as number, e.target.checked)}
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
