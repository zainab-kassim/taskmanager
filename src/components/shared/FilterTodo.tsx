import React from 'react';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Todo } from '../../types/todo';
import { Checkmark24Regular, Star12Filled, Star16Regular } from '@fluentui/react-icons';
import Errorpage from '../ui/Errorpage.tsx';

function FilterTodo({ todos, setTodos }) {
    const { SearchValue } = useParams();
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])


    useEffect(() => {
        if (SearchValue) {
            const matchingTodos = todos.filter(todo =>
                todo.text.toLowerCase().includes(SearchValue.toLowerCase())
            );
            setFilteredTodos(matchingTodos);
        } else {
            setFilteredTodos([]);
        }
    }, [SearchValue, todos]);




    function HandleToggleComplete(id: string) {
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

    return (
        <div>
            {filteredTodos && filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                    <div key={todo.id} className="flex justify-between items-center py-5 px-5 border rounded-md bg-white shadow-md mb-4">
                        <div className="flex items-center gap-3">
                            <span
                                onClick={() => HandleToggleComplete(todo.id)}
                                className={`rounded-full w-4 h-4 flex items-center justify-center cursor-pointer transition-colors ${todo.isCompleted ? 'bg-blue-600' : 'bg-white border border-black'}`}
                            >
                                {todo.isCompleted && <Checkmark24Regular className='text-white size-3 font-black stroke-[3]' />}
                            </span>
                            <span className={todo.isCompleted ? 'line-through text-gray-500' : ''}>
                                {todo.text}
                            </span>
                        </div>

                        <button onClick={() => HandleToggleStar(todo.id)}>
                            {todo.starred ? (
                                <Star12Filled className='text-yellow-500 size-5 stroke-[1]' />
                            ) : (
                                <Star16Regular className='size-5 font-black stroke-[1] text text-black' />
                            )}
                        </button>
                    </div>
                ))) : (
               <Errorpage/>
            )}
        </div>
    )
}

export default FilterTodo