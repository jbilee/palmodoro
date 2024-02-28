const TodoList = () => {
  const sampleTodos = [
    { id: 1, text: "Read a book", checked: false },
    { id: 2, text: "Do homework", checked: false },
    { id: 3, text: "Feed the bird", checked: true },
  ];
  return (
    <div>
      <ul>
        {sampleTodos.map(({ id, text, checked }) => (
          <li key={id}>
            {text} <input type="checkbox" checked={checked} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
