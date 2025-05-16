import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Todo } from '../../types/todo'
import { Checkmark24Regular, Flag16Filled, Flag16Regular, Star12Filled,Star16Regular } from '@fluentui/react-icons'
import { TrashIcon } from 'lucide-react'

function TodoItem({ todos, setTodos }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [TodoItem, setTodoItem] = useState<Todo>({
        id: "",
        text: "",
        isCompleted: false,
        starred: false,
        isImportant: false,
    });


    function updateTodoAndList(updatedTodo: Todo) {
        setTodoItem(updatedTodo);
        const updatedTodos = todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
        );
        setTodos(updatedTodos);
    }


    useEffect(() => {
        if (id) {
            const found = todos.find((todo) => todo.id === id);
            if (found) {
                setTodoItem(found);
            }
        }
    }, [id, todos]);


    function HandleToggleComplete(id: string) {
        const updated = { ...TodoItem, isCompleted: !TodoItem.isCompleted };
        updateTodoAndList(updated);
    }

    function HandleToggleStar(id: string) {
        const updated = { ...TodoItem, starred: !TodoItem.starred };
        updateTodoAndList(updated);
    }

    function HandleToggleImportant(id: string) {
        const updated = { ...TodoItem, isImportant: !TodoItem.isImportant };
        updateTodoAndList(updated);
    }

    function HandleTodoDelete(id: string) {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);

        // Reset current TodoItem (optional)
        setTodoItem({
            id: "",
            text: "",
            isCompleted: false,
            starred: false,
            isImportant: false,
        });

        // Navigate back to the tasks list page (adjust the path as needed)
        navigate('/tasks');
    }



    return (
        <div className={`pb-5 px-10 w-1/2 rounded-md bg-white shadow-md ${TodoItem.isCompleted ? 'border-t-[6px] border-blue-600' : ' pt-5'} `}>
            <div onClick={() => HandleToggleComplete(TodoItem.id)} className="flex items-center py-5 pl-5">
                <span className={`rounded-full size-7  flex items-center justify-center cursor-pointer transition-colors ${TodoItem.isCompleted ? 'bg-blue-600' : 'bg-white border border-black'}`}
                >
                    {TodoItem.isCompleted && <Checkmark24Regular className='text-white size-7 font-black stroke-[3]' />}
                </span>
                <span className={`text-2xl pl-4 ${TodoItem.isCompleted ? 'line-through text-gray-500' : ''}`}>
                    {TodoItem.text}
                </span>
            </div>

            <div className='flex items-center p-5  border-t border-gray-400' onClick={() => HandleToggleStar(TodoItem.id)}>
                {TodoItem.starred ? (
                    <Star12Filled className='text-yellow-500 size-7 stroke-[1]' />
                ) : (
                    <Star16Regular className='size-7 font-black stroke-[1] text text-black' />
                )}
                <span className='text-gray-700 text-2xl pl-4'>starred</span>
            </div>

            <div className='flex  items-center p-5  border-t border-gray-400' onClick={() => HandleToggleImportant(TodoItem.id)}>
                {TodoItem.isImportant ? (
                    <Flag16Filled className='text-black size-8 stroke-[1]' />
                ) : (
                    <Flag16Regular className='size-7 font-black stroke-[1]  text-black' />
                )}
                <span className='text-gray-700 text-2xl pl-4'>Important</span>
            </div>

            <div className='flex  items-center p-5 border-t border-gray-400' onClick={() => HandleTodoDelete(TodoItem.id)}>
                <TrashIcon className='size-7 stroke-[1] text-red-600' />
                <span className='text-gray-700 text-2xl pl-4'>Delete</span>
            </div>
        </div>

    )
}

export default TodoItem