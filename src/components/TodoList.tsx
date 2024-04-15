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
  const todoCount = useRef(todos.length || 0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!wrapper.current) return;
    if (todos.length > todoCount.current) {
      wrapper.current.scroll(0, wrapper.current.scrollHeight);
      todoCount.current = todos.length;
    }
  }, [todos]);

  const handleChange = (id: number, checked: boolean) => {
    dispatch(toggleTodo({ id, checked }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
    todoCount.current -= 1;
  };

  return (
    <Wrapper ref={wrapper}>
      <ul>
        {todos.map(({ id, text, checked }) => (
          <ListItem key={id}>
            <StyledFormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => handleChange(id as number, e.target.checked)}
                  disableRipple
                />
              }
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

const Wrapper = styled.div`
  max-height: 260px;
  padding-right: 10px;
  scrollbar-gutter: stable;
  overflow-y: auto;
`;

const ListItem = styled.li`
  display: flex;
  gap: 6px;
  align-items: center;
  transition: 200ms;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  flex-grow: 1;
`;

// const WhiteCheckbox = styled(Checkbox)<CheckboxProps>({
//   color: "white",
//   "& .MuiSvgIcon-root": {
//     color: "white"
//   }
// });

export default TodoList;
