import React from 'react'
import { LogOutIcon,CircleUserRound ,NotebookPen} from 'lucide-react';
import { auth } from './Firebase';

const Sidebar = ({children,onIsLogin}) => {
  async function handleLogout() {
    try {
      onIsLogin(false)
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  
  return (
<div class={`flex dark:bg-gray-200 text-gray-900`}>
  {/* sidebar */}
  <aside class="flex h-screen w-20 flex-col items-center border-r border-gray-200 bg-white">
    <nav class="flex flex-1 flex-col gap-y-4 pt-10">
    <a href="/allnote" class="text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50">
      <button class="mt-2 rounded-full bg-gray-100 group-hover:text-blue-600">
        <NotebookPen />
      </button>

        <div class="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
          <div class="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg" >  
            <div class="absolute inset-0 -left-1 flex items-center">
              <div class="h-2 w-2 rotate-45 bg-white"></div>
            </div>
            All Notes <span class="text-gray-400">(Y)</span>
          </div>
        </div>
      </a>
      
      <a href="/addnote" class="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50">
        <svg class="h-6 w-6 stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 9V15M9 12H15H9Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
          <div class="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
            <div class="absolute inset-0 -left-1 flex items-center">
              <div class="h-2 w-2 rotate-45 bg-white"></div>
            </div>
            Add Note   <span class="text-gray-400">(Y)</span>
          </div>
        </div>
      </a>
    </nav>

    <div class="flex flex-col items-center gap-y-4 py-10">
    <a href="#" class="text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50">
      <button onClick={handleLogout} class="h-6 w-6 stroke-current group-hover:text-blue-600">
        <LogOutIcon />
      </button>
      <div class="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
          <div class="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
            <div class="absolute inset-0 -left-1 flex items-center">
              <div class="h-2 w-2 rotate-45 bg-white"></div>
            </div>
            Log Out <span class="text-gray-400">(Y)</span>
          </div>
        </div>
    </a>
    <a href="/profile" class="text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50">
      <button class="mt-2 rounded-full bg-gray-100 group-hover:text-blue-600">
        <CircleUserRound class="h-10 w-10 rounded-full"/>
      </button>
      <div class="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
          <div class="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
            <div class="absolute inset-0 -left-1 flex items-center">
              <div class="h-2 w-2 rotate-45 bg-white"></div>
            </div>
            Profile <span class="text-gray-400">(Y)</span>
          </div>
        </div>
    </a>
    </div>
    
  </aside>
  <div className='w-full flex justify-center items-center'>
  {children}
  </div>
</div>
  )
}

export default Sidebar