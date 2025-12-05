import React from 'react'
import { ModeToggle } from '../../ui/mode-toggle' 

const Header = () => {
  return (
    <nav className='fixed right-4 flex justify-center p-6 items-center'>
      <ModeToggle />
    </nav>
  )
}

export default Header