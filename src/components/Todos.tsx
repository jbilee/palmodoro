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
  display: flex;
  flex-direction: column-reverse;
  gap: 12px;
  @media (min-width: 600px) {
    width: 520px;
  }
  @media (min-width: 1200px) {
    align-self: flex-end;
    flex-direction: column;
  }
`;

export default Todos;
