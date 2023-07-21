export const sortTodosByTitle = (todos) => {
  // Преобразуем объект в массив, где каждый элемент массива будет содержать ключ (id) и значения (задача)
  const todosArray = Object.entries(todos).map(([id, todo]) => ({ id, ...todo }));

  // Отсортируем массив по полю title
  const sortedTodos = todosArray.sort((a, b) => a.title.localeCompare(b.title));

  return sortedTodos;
};
