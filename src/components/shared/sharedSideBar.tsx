"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar.tsx";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconRepeat,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils.ts";
import user from "../../assets/images/user.png"
import { Add12Regular, ArrowRepeatAllOff20Regular, Calendar12Filled, Calendar12Regular, Calendar16Regular, Check24Regular, DeleteRegular, Flag16Regular, Replay24Regular, Replay32Regular, ReplayRegular, Star12Filled, Star16Regular, StarRegular, TaskListLtr24Regular } from "@fluentui/react-icons";
import { Todo } from "../../types/todo.ts";
import { Checkmark24Regular, EditRegular, SearchRegular, Star12Regular } from '@fluentui/react-icons';
import { v4 as uuidv4 } from 'uuid';
import { CheckCircleIcon, CheckIcon, Repeat1Icon, Repeat2 } from "lucide-react";
import { Outlet } from "react-router-dom";

export function SidebarDemo() {
    const [SearchValue, setSearchValue] = useState('');
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])
    const [inputValue, setInputValue] = useState('');

    const [todos, setTodos] = useState<Todo[]>(() => {
        // Initialize todos from localStorage
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
      });


    // Add this useEffect to save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);



    // // Add this useEffect to load todos from localStorage when the app starts
    // useEffect(() => {
    //     const savedTodos = localStorage.getItem('todos');
    //     if (savedTodos) {
    //         setTodos(JSON.parse(savedTodos));
    //     }
    // }, []);

    // // Add this useEffect to save todos to localStorage whenever they change
    // useEffect(() => {
    //     localStorage.setItem('todos', JSON.stringify(todos));
    // }, [todos]);



    function HandleUpdateTodos(id: string) {
        const updateTodo = todos.find(todo => todo.id === id);
        if (updateTodo) {
            setInputValue(updateTodo.text);
            HandleTodoDelete(id);
        }
    }

    function HandleTodoDelete(id: string) {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos)
        // Update localStorage immediately

    }

    // function handleToggleComplete(id: string) {
    //     const newTodos = todos.map((todo) => {
    //         if (todo.id === id) {
    //             return { ...todo, isCompleted: !todo.isCompleted };
    //         }
    //         return todo;
    //     });
    //     setTodos(newTodos);

    // }

    // function handleToggleStar(id: string) {
    //     const newTodos = todos.map((todo) => {
    //         if (todo.id === id) {
    //             return { ...todo, starred: !todo.starred };
    //         }
    //         return todo;
    //     });
    //     setTodos(newTodos);

    // }

    function HandleSearch() {
        if (SearchValue) {
            const matchingTodos = todos.filter(todo => todo.text.toLowerCase().includes(SearchValue.toLowerCase()));
            setFilteredTodos(matchingTodos);
            console.log(matchingTodos);
            setSearchValue('');
        } else {
            return 'no matching todos found'
        }
    }

    const links = [
        {
            label: "Tasks",
            href: "/",
            icon: (
                <TaskListLtr24Regular className="h-6 w-6 shrink-0 text-black" />
            ),
        },
        {
            label: "Starred",
            href: "/starred",
            icon: (
                <Star16Regular className="h-6 w-6 shrink-0 text-black" />
            ),
        },
        {
            label: "Completed",
            href: "/completed",
            icon: (
                <CheckCircleIcon className="h-6 w-6 shrink-0 text-black" />
            ),
        },
        {
            label: "Important",
            href: "/important",
            icon: (
                <Flag16Regular className="h-6 w-6 shrink-0 text-black" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);


    return (
        <>

            <div className='rounded-md text-black  bg-neutral-50 shadow-md flex justify-between items-center py-3 px-4'>
                <h1 className='text-xl font-sans md:text-lg'>Todo</h1>
                <div className='flex  relative items-center'>
                    <input className='w-[40vw] border  border-slate-700 rounded-md  outline-none pl-4 py-2 pr-8  [&::-webkit-search-cancel-button]:hidden' type="search" value={SearchValue} placeholder='search' onChange={(e) => setSearchValue(e.target.value)} />
                    <button onClick={HandleSearch}><SearchRegular className='size-4 stroke-[3] absolute right-2 bottom-3 text-black' /></button>
                </div>
            </div>

            <div
                className={cn(
                    "flex w-full max-w-full flex-1 flex-col overflow-hidden rounded-md shadow-md mt-5 border-neutral-200 bg-neutral-50 md:flex-row",
                    "h-[80vh]",
                )}
            >
                <Sidebar open={open} setOpen={setOpen} animate={false}>
                    <SidebarBody className="justify-between gap-10 shadow-md">
                        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto ">
                            <div className="my-8 px-4 flex flex-col gap-8">
                                {links.map((link, id) => (
                                    <SidebarLink key={id} link={link} />
                                ))}
                            </div>
                            <hr className="border" />

                            <h1 className="text-pretty text-left text-xl pt-5 pb-3 px-4">Todo List</h1>
                            {todos && todos.length > 0 ? (
                                todos.map((todo) => (
                                    <div key={todo.id} className="flex flex-col">
                                        <div className="inline-block  text-nowrap text-ellipsis truncate py-3 hover:bg-neutral-200 px-4 hover:border-l-4 hover:border-blue-600  ">
                                            {todo.text}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col">
                                    <div className="inline-block  text-nowrap text-ellipsis truncate py-3 hover:bg-neutral-200 px-4 hover:border-l-4 hover:border-blue-600  ">
                                        No todos found
                                    </div>
                                </div>
                            )}

                        </div>

                        <div>
                            <hr className="border" />
                            <SidebarLink className="px-4 pt-4"
                                link={{
                                    label: "User",
                                    href: "#",
                                    icon: (
                                        <img
                                            src={user}
                                            className="h-7 w-7 shrink-0 rounded-full"
                                            width={50}
                                            height={50}
                                            alt="Avatar"
                                        />

                                    ),
                                }}

                            />
                        </div>
                    </SidebarBody>
                </Sidebar>


                <div className="h-full w-full rounded-tr-md rounded-br-md shadow-md  bg-neutral-50 p-2 md:p-10 ">
                    <Outlet />

                </div>

            </div>
        </>
    );
}


