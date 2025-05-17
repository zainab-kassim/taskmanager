import React from 'react';
import { useState } from 'react';
import { Todo } from '../../types/todo';
import { v4 as uuidv4 } from 'uuid';
import { Add12Regular, Checkmark24Regular, EditRegular, Star12Filled, Star12Regular } from '@fluentui/react-icons';


function AddTodo({ todos, setTodos }) {
    const [inputValue, setInputValue] = useState('');

    function handleToggleComplete(id: string) {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        });
        setTodos(newTodos);
    }

    function HandleToggleStar(id: string) {
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
            const newTodos = { id: uuidv4(), text: inputValue, isCompleted: false, starred: false, isImportant: false };
            setTodos([newTodos, ...todos]);
            setInputValue('');
        } catch (error) {
            console.log(error);
        }
    }

    function HandleTodosUpdate(id: string) {
        const updateTodo = todos.find(todo => todo.id === id);
        if (updateTodo) {
            setInputValue(updateTodo.text);
            HandleTodoDelete(id);
        }
    }

    //handles delete  functionality and uopdates the state immmediately
    function HandleTodoDelete(id: string) {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos)
    }

    return (
        <div>
            <input className='border text-lg w-full shadow-md rounded-t-md  outline-none pl-4 py-5 pr-8' type="text" value={inputValue} placeholder="Add a Task" onChange={(e) => setInputValue(e.target.value)} />
            <div className="py-3 px-5 border rounded-b-md bg-zinc-100 shadow-md flex justify-end">
                <button disabled={!inputValue} onClick={HandleAddTodos}><Add12Regular className=" w-7 h-7  text-blue-600" /></button>
            </div>

            <div className="my-10 max-h-[70vh] overflow-y-auto pb-40">

                {todos.map((todo: Todo) => (
                    <div key={todo.id} className="flex justify-between items-center py-5 px-5 border rounded-md bg-white shadow-md mb-4">
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

                        <div className='space-x-5 flex items-center'>
                            <button onClick={() => HandleTodosUpdate(todo.id)}><EditRegular className='size-5 font-black stroke-[1]  text-black' /> </button>
                            <button onClick={() => HandleToggleStar(todo.id)}>
                                {todo.starred ? (
                                    <Star12Filled className='text-yellow-500 size-5 stroke-[1]' />
                                ) : (
                                    <Star12Regular className='size-5 font-black stroke-[1] text text-black' />
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddTodo