import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { Todo } from './types/todo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {SharedSideBar} from './components/shared/SharedSideBar.tsx'
import AddTodo from './components/shared/AddTodo.tsx';
import StarredTodo from './components/shared/StarredTodo.tsx'
import ImportantTodo from './components/shared/ImportantTodo.tsx'
import FilterTodo from './components/shared/FilterTodo.tsx'
import TodoItem from './components/shared/TodoItem.tsx'
import CompletedTodo from './components/shared/CompletedTodo.tsx'



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


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedSideBar todos={todos} setTodos={setTodos} />}>
            <Route index element={<AddTodo todos={todos} setTodos={setTodos} />} />
            <Route path="/starred" element={<StarredTodo todos={todos} setTodos={setTodos} />} />
            <Route path="/completed" element={<CompletedTodo todos={todos} setTodos={setTodos} />} />
            <Route path="/important" element={<ImportantTodo todos={todos} setTodos={setTodos} />} />
            <Route path="/search/:SearchValue" element={<FilterTodo todos={todos} setTodos={setTodos} />} />
            <Route path="/todo/:id" element={<TodoItem todos={todos} setTodos={setTodos} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
