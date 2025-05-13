import React, { useState, useEffect } from 'react';
import './App.css';
import { Todo } from './types/todo';
import { SidebarDemo } from './components/shared/sharedSideBar.tsx';
import { SearchRegular } from '@fluentui/react-icons';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTodo from './components/shared/AddTodo.tsx';
import Filter from './components/shared/Filters.tsx';
import TodoList from './components/shared/TodoList.tsx';
import TodoItem from './components/shared/TodoItem.tsx';



function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Initialize todos from localStorage
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add this useEffect to load todos from localStorage when the app starts
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
      console.log(todos);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SidebarDemo />}>
            <Route index element={<AddTodo />} />
            <Route path="starred" element={<Filter />} />
            <Route path="completed" element={<TodoItem />} />
            <Route path="important" element={<TodoItem />} />
          </Route>
        </Routes>
      </BrowserRouter>


      {/* <div>
        {filteredTodos && filteredTodos.length > 0 ? (
          filteredTodos.map((todo, id) => (
            <div key={id}>
              <span
                onClick={() => handleToggleComplete(todo.id)}
                className={`rounded-full w-4 h-4 flex items-center justify-center cursor-pointer transition-colors ${todo.isCompleted ? 'bg-blue-600' : 'bg-white border border-black'}`}
              >
                {todo.isCompleted && <Checkmark24Regular className='text-white size-3 font-black stroke-[3]' />}
              </span>

              <span className={todo.isCompleted ? 'line-through text-gray-500' : ''}>{todo.text}</span>
              <button onClick={() => HandleUpdateTodos(todo.id)}><EditRegular /> </button>
              <button onClick={() => HandleTodoDelete(todo.id)} className='text-red-700' ><DeleteRegular /></button>
              <button onClick={() => handleToggleStar(todo.id)}>
                {todo.starred ? (
                  <Star12Filled className='text-yellow-500 size-4 stroke-[3]' />
                ) : (
                  <Star12Regular className='size-4 font-black stroke-[3] text text-black' />
                )}
              </button>
            </div>
          ))
        ) : (
          <div>
            <p>no matching todos found</p>
          </div>
        )} */}

    </div>
  );
}



export default App;
