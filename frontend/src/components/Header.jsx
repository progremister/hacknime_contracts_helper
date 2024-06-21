import React from 'react'
import ProfileDropdown from './ProfileDropdown'

function Header() {
  return (
    <div className='w-full px-4 py-1  bg-indigo-400 text-[2.2rem] text-white flex justify-between'>
        <div className='flex items-center gap-2'>
            <img src="./assets/logo.png" alt="logo" className='w-16 h-16'/>
            <div className=' font-bold'>Podklady.sk</div>
        </div>
        <ProfileDropdown />
    </div>
  )
}

export default Header