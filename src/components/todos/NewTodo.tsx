import { useState, type FormEventHandler } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { addTodo, clearTodos } from "../../reducers/todosReducer";

const NewTodo = () => {
  const [todo, setTodo] = useState("");
  const todoCount = useAppSelector((state) => state.todos.length);
  const dispatch = useAppDispatch();

  const handleChange = (input: string) => {
    if (input.length > 50) return;
    setTodo(input);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (todo === "") return;
    dispatch(addTodo(todo));
    setTodo("");
  };

  const handleClear = () => dispatch(clearTodos());

  return (
    <form onSubmit={handleSubmit}>
      <Content>
        <InputArea placeholder="What's my plan?" value={todo} onChange={(e) => handleChange(e.target.value)} />
        <Button type="submit" variant="contained" disableElevation>
          Add
        </Button>
        <Button variant="contained" color="secondary" disableElevation disabled={todoCount === 0} onClick={handleClear}>
          Clear
        </Button>
      </Content>
    </form>
  );
};

const Content = styled.div`
  display: flex;
  gap: 6px;
`;

const InputArea = styled.input`
  resize: none;
  border: none;
  width: 100%;
  box-shadow: 0 0 15px rgba(29, 101, 122, 0.15);
  border-radius: 4px;
  padding: 8px 12px;
`;

export default NewTodo;
