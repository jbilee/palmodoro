import { useState, type FormEventHandler } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks";
import { addTodo } from "../reducers/todosReducer";

const NewTodo = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (input: string) => {
    if (input.length > 30) return;
    setTodo(input);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (todo === "") return;
    dispatch(addTodo(todo));
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Content>
        <InputArea placeholder="What's my plan?" value={todo} onChange={(e) => handleChange(e.target.value)} />
        <button>Add</button>
      </Content>
    </form>
  );
};

const Content = styled.div`
  display: flex;
  gap: 12px;

  button {
    border: none;
    background: black;
    color: white;
    border-radius: 6px;
    padding: 2px 12px;
  }
`;

const InputArea = styled.input`
  resize: none;
  border: none;
  width: 300px;
  box-shadow: 0 0 15px rgba(29, 101, 122, 0.15);
  border-radius: 6px;
  padding: 8px 12px;
`;

export default NewTodo;
