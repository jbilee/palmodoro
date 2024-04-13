import { useEffect, useRef } from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import styled from "styled-components";
import { HiTrash } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteTodo, toggleTodo } from "../reducers/todosReducer";
import { InteractiveIcon } from "./TimerContainer";

const TodoList = () => {
  const wrapper = useRef<null | HTMLDivElement>(null);
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!wrapper.current) return;
    wrapper.current.scroll(0, wrapper.current.scrollHeight);
  }, [todos]);

  const handleChange = (id: number, checked: boolean) => {
    dispatch(toggleTodo({ id, checked }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <Wrapper ref={wrapper}>
      <ul>
        {todos.map(({ id, text, checked }) => (
          <ListItem key={id}>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={(e) => handleChange(id as number, e.target.checked)} />}
              label={text}
              checked={checked}
            />
            <InteractiveIcon>
              <HiTrash onClick={() => handleDelete(id)} />
            </InteractiveIcon>
          </ListItem>
        ))}
      </ul>
    </Wrapper>
  );
};
{
  /* <ListItem key={id}>
            <div>
              <Checkbox checked={checked} onChange={(e) => handleChange(id as number, e.target.checked)} />
              <span className={checked ? "crossed-out" : ""}>{text}</span>
            </div>
            <InteractiveIcon>
              <HiTrash onClick={() => handleDelete(id)} />
            </InteractiveIcon>
          </ListItem> */
}

const Wrapper = styled.div`
  max-height: 280px;
  overflow-y: auto;
  margin-bottom: 8px;
`;

const ListItem = styled.li`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  flex-grow: 1;
  /* &:hover {
  background: yellow;
} */
`;

// const WhiteCheckbox = styled(Checkbox)<CheckboxProps>({
//   color: "white",
//   "& .MuiSvgIcon-root": {
//     color: "white"
//   }
// });

export default TodoList;
