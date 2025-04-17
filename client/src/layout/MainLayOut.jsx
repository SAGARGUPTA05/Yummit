import React from 'react'
import Navbar from '../components/ui/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/ui/Footer'
import { useThemeStore } from '../store/useThemeStore'

function MainLayOut() {
  const{theme}=useThemeStore()
  return (
    <div className='flex flex-col min-h-screen m-2 mt-5 md:m-0 '>
        
        <header><Navbar></Navbar></header>
        <div className={`${theme=="light" ?'bg-gradient-to-b from-orange-100 via-yellow-100 to-white' :'bg-[#121212]'} flex-1  pt-[2rem] `}><Outlet></Outlet></div>
        <footer className='w-screen '>
            <Footer></Footer>
        </footer>
    </div>
  )
}

export default MainLayOut