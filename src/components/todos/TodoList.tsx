import { useEffect, useRef } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { HiTrash } from "react-icons/hi";
import styled from "styled-components";
import StyledIcon from "../common/StyledIcon";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { deleteTodo, toggleTodo } from "../../reducers/todosReducer";

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
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => handleChange(id as number, e.target.checked)}
                  disableRipple
                />
              }
              label={text}
              checked={checked}
              sx={{
                opacity: checked ? 0.5 : 1,
                textDecoration: checked ? "line-through" : "none",
                flexGrow: 1,
              }}
            />
            <StyledIcon>
              <HiTrash onClick={() => handleDelete(id)} />
            </StyledIcon>
          </ListItem>
        ))}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 200px;
  padding-right: 10px;
  scrollbar-gutter: stable;
  overflow-y: auto;
  @media (min-width: 600px) {
    max-height: 260px;
  }
`;

const ListItem = styled.li`
  display: flex;
  gap: 6px;
  align-items: center;
  transition: 200ms;
  text-shadow: 0px 0px 3px #332558;
  &:hover {
    opacity: 0.8;
  }
`;

export default TodoList;
