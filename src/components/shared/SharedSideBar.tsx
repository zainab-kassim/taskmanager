import React from 'react';
import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar.tsx";
import { cn } from "../../lib/utils.ts";
import { Flag16Regular, Star16Regular, TaskListLtr24Regular, SearchRegular } from "@fluentui/react-icons";
import { CheckCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";


export function SharedSideBar({ todos, setTodos }) {
    const [SearchValue, setSearchValue] = useState('');
    const navigate = useNavigate()

    // load todos from localStorage when the app starts
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);


    // save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(todos)
    }, [todos]);


    const links = [
        {
            label: "Tasks",
            routes: "/",
            icon: (
                <TaskListLtr24Regular className="h-6 w-6 shrink-0 text-black" />
            ),
        },
        {
            label: "Starred",
            routes: "/starred",
            icon: (
                <Star16Regular className="h-6 w-6 shrink-0 text-black" />
            ),
        },
        {
            label: "Completed",
            routes: "/completed",
            icon: (
                <CheckCircleIcon className="h-6 w-6 shrink-0 text-black" />
            ),
        },
        {
            label: "Important",
            routes: "/important",
            icon: (
                <Flag16Regular className="h-6 w-6 shrink-0 text-black" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);


    return (
        <>
            <div className='rounded-md text-black  bg-neutral-50 shadow-md flex justify-between items-center py-3 px-4'>
                <div className="flex space-x-2 items-center">
                    <img className="w-9 h-9" src='https://cdn-icons-png.flaticon.com/512/17836/17836274.png
'/>
                <h1 className='text-xl font-sans tracking-tighter'>𝓣𝓸𝓭𝓸</h1>
                </div>

                <div className='flex  relative items-center'>
                    <input className='w-[40vw] border  border-slate-700 rounded-md  outline-none pl-4 py-2 pr-8  [&::-webkit-search-cancel-button]:hidden' type="search" value={SearchValue} placeholder='search' onChange={(e) => setSearchValue(e.target.value)} />
                    <button onClick={() => navigate(`/search/${SearchValue}`)}><SearchRegular className='size-7 stroke-[5] absolute right-2 bottom-1.5 text-black' /></button>
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

                            <h1 className="text-pretty text-left text-2xl pt-5 pb-3 tracking-tighter px-4">𝓣𝓸𝓭𝓸 𝓛𝓲𝓼𝓽</h1>
                            {todos && todos.length > 0 ? (
                                todos.map((todo) => (
                                    <div key={todo.id} className="flex flex-col ">
                                        <div onClick={() => navigate(`/todo/${todo.id}`)} className="inline-block  text-nowrap text-ellipsis truncate py-3 hover:bg-neutral-200 px-4 hover:border-l-4 hover:border-blue-600 ">
                                            {todo.text}
                                        </div>
                                    </div>

                                ))) : (
                                <div className="flex flex-col">
                                    <div className="inline-block  text-nowrap text-ellipsis truncate py-3 hover:bg-neutral-200 px-4 hover:border-l-4 hover:border-blue-600  ">
                                        No todos found
                                    </div>
                                </div>
                            )}
                        </div>
                    </SidebarBody>
                </Sidebar>
                <div className="h-full w-full rounded-tr-md rounded-br-md shadow-md  bg-neutral-50 p-2 md:p-10 ">
                    <Outlet />
                </div>
            </div >
        </>
    );
}


