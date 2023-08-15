import { createEffect, createSignal } from "solid-js";
import 'tailwindcss/tailwind.css';

function App() {
  const [todos, setTodos] = createSignal(JSON.parse(localStorage.getItem('todos')) || []);
  const [input, setInput] = createSignal("");

  const addTodo = () => {
    const newTodos = [...todos(), { text: input(), done: false }];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setInput("");
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos()];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div class="container mx-auto mt-10">
      <div class="flex flex-col items-center">
        <h1 class="text-2xl mb-5">To-Do List</h1>
        <div class="flex">
          <input type="text" class="border p-2 rounded-l-md" value={input()} onInput={(e) => setInput(e.target.value)} />
          <button class="bg-blue-500 text-white p-2 rounded-r-md" onClick={addTodo}>Add</button>
        </div>
        <ul class="mt-5">
          {todos().map((todo, index) => (
            <li class="flex items-center mb-2">
              <input type="checkbox" class="form-checkbox mr-2" checked={todo.done} onChange={() => toggleTodo(index)} />
              <span class={`${todo.done ? 'line-through' : ''}`}>{todo.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

