// TodoService.ts
import TodoItem from '@/models/TodoItem';

const getTodos = (): TodoItem[] => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
};

const saveTodos = (todos: TodoItem[]): void => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const addTodo = (title: string): void => {
  const todos = getTodos();
  const todo = new TodoItem(Date.now(), title);
  todos.push(todo);
  saveTodos(todos);
};

const removeTodo = (id: number): void => {
  const todos = getTodos();
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  saveTodos(filteredTodos);
};

const toggleTodo = (id: number): void => {
  const todos = getTodos();
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  saveTodos(updatedTodos);
};

const updateTodoOrder = (todos: TodoItem[]): void => {
  saveTodos(todos);
};

export { getTodos, addTodo, removeTodo, toggleTodo, updateTodoOrder };
