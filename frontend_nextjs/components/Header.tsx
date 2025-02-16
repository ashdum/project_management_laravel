'use client'

import Image from "next/image"
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from "react-avatar"
import { useBoardStore } from "@/store/BoardStore"

function Header() {
    const searchString = useBoardStore((state) => state.searchString);
    const setSearchString = useBoardStore((state) => state.setSearchString);
    
    /* const [searchString, setSearchString] = useBoardStore((state) => [
        state.searchString,
        state.setSearchString
    ]) */
    return (
        <header>
            <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
                <div
                className="
                absolute
                top-0
                left-0
                w-full
                h-96
                bg-gradient-to-br
                from-[#72f4be]
                to-[#0050D1]
                rounded-md
                blur-3xl
                opacity-50
                -z-50
                "
                
                />
                <Image
                    src="/logo.png"
                    alt="File icon"
                    width={300}
                    height={100}
                    className="w-44 md:w-36 mb-10 md:mb-0 object-contain rounded-sm "
                    priority={true}
                />

                <div className="flex items-center space-x-5 flex-1 py-2 justify-end w-full">
                    <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
                        <input 
                        type="text" 
                        placeholder="Search" 
                        value={searchString}
                        onChange={e => setSearchString(e.target.value)}
                        className="flex-1 outline-none p-2 " 
                        />
                        <button hidden type="submit">Search</button>
                    </form>

                    <Avatar name="Ashot Dumikyan"  round size="50"/>
                </div>
            </div>
            <div className="flex items-center justify-center px-5 md:py-5">
                <p className="flex items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0050D1]">
                    <UserCircleIcon className="inline-block h-10 w-10 text-[#0050D1] mr-1" />
                    GPT is summarsing your tasks for the day ...
                </p>
            </div>

        </header>
    )
}

export default Header