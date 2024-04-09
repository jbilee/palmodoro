import styled from "styled-components";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";

const Todos = () => {
  return (
    <Wrapper>
      <TodoList />
      <NewTodo />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-self: flex-end;
`;

export default Todos;
