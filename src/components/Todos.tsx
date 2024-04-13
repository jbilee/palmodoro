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
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 1200px) {
    flex-direction: column;
  }
`;

export default Todos;
