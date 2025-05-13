import React, { useEffect, useState } from 'react'
import { Todo } from '../../types/todo';
import { v4 as uuidv4 } from 'uuid';
import { Add12Regular, Checkmark24Regular, Star12Filled, Star12Regular } from '@fluentui/react-icons';
import { IconRepeat } from '@tabler/icons-react';

function AddTodo() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [inputValue, setInputValue] = useState('');
    

    // Add this useEffect to load todos from localStorage when the app starts
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // Add this useEffect to save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    function handleToggleComplete(id: string) {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        });
        setTodos(newTodos);

    }

    function handleToggleStar(id: string) {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, starred: !todo.starred };
            }
            return todo;
        });
        setTodos(newTodos);

    }

    function HandleAddTodos() {
        try {
            const newTodos = [...todos, { id: uuidv4(), text: inputValue, isCompleted: false, starred: false }];
            setTodos(newTodos);
            setInputValue('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <input className='border text-lg w-full shadow-md rounded-t-md  outline-none pl-4 py-5 pr-8' type="text" value={inputValue} placeholder="Add a Task" onChange={(e) => setInputValue(e.target.value)} />
            <div className="flex justify-between items-center py-3 px-5 border rounded-b-md bg-zinc-100 shadow-md">
                <button disabled={!inputValue} onClick={HandleAddTodos}> <IconRepeat className=" w-6 h-6 text-black" /> </button>
                <button disabled={!inputValue} onClick={HandleAddTodos}><Add12Regular className=" w-7 h-7 text-blue-600" /></button>
            </div>

            <div className="my-10 max-h-[70vh] overflow-y-auto pb-40">
                {todos.map((todo, id) => (
                    <div key={id} className="flex justify-between items-center py-5 px-5 border rounded-md bg-white shadow-md mb-4">
                        <div className="flex items-center gap-3">
                            <span
                                onClick={() => handleToggleComplete(todo.id)}
                                className={`rounded-full w-4 h-4 flex items-center justify-center cursor-pointer transition-colors ${todo.isCompleted ? 'bg-blue-600' : 'bg-white border border-black'}`}
                            >
                                {todo.isCompleted && <Checkmark24Regular className='text-white size-3 font-black stroke-[3]' />}
                            </span>
                            <span className={todo.isCompleted ? 'line-through text-gray-500' : ''}>
                                {todo.text}
                            </span>
                        </div>
                        {/* <button onClick={() => HandleUpdateTodos(todo.id)}><EditRegular /> </button>
                    <button onClick={() => HandleTodoDelete(todo.id)} className='text-red-700' ><DeleteRegular /></button> */}
                        <button onClick={() => handleToggleStar(todo.id)}>
                            {todo.starred ? (
                                <Star12Filled className='text-yellow-500 size-5 stroke-[1]' />
                            ) : (
                                <Star12Regular className='size-5 font-black stroke-[1] text text-black' />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddTodo