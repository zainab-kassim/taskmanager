import { Checkmark24Regular, Flag16Filled, Flag16Regular, Star12Filled, Star12Regular } from '@fluentui/react-icons';
import { Todo } from '../../types/todo.ts';
import Errorpage from '../ui/Errorpage.tsx';


function ImportantTodo({ todos, setTodos }) {
    const importantTodos = todos.filter(todo => todo.isImportant);

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

    function HandleToggleImportant(id: string) {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isImportant: !todo.isImportant };
            }
            return todo;
        });
        setTodos(newTodos);
    }


    return (
        <div className="my-10 max-h-[70vh] overflow-y-auto pb-40">
            {importantTodos && importantTodos.length > 0 ? (importantTodos.map((todo: Todo) => (
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
                    <div className='flex space-x-3 items-center justify-center'>
                        <button onClick={() => HandleToggleStar(todo.id)}>
                            {todo.starred ? (
                                <Star12Filled className='text-yellow-500 size-5 stroke-[1]' />
                            ) : (
                                <Star12Regular className='size-5 font-black stroke-[1] text text-black' />
                            )}
                        </button>
                        <button onClick={() => HandleToggleImportant(todo.id)}>
                            {todo.isImportant ? (
                                <Flag16Filled className='text-black size-5 stroke-[1]' />
                            ) : (
                                <Flag16Regular className='size-5 font-black stroke-[1]  text-black' />
                            )}
                        </button>
                    </div>
                </div>
            ))) : (
                <Errorpage />
            )}
        </div >
    )

}

export default ImportantTodo


