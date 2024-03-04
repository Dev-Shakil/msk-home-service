import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className="flex shadow-sm p-5 items-center justify-between">
        <div className="flex items-center gap-8 ">
            <Image src={'/logo.svg'} alt="logo" width={180} height={100} />
            <div class="md:flex hidden gap-6 items-center">
                <h2 className="hover:scale-105 hover:text-primary cursor-pointer">Home</h2>
                <h2 className="hover:scale-105 hover:text-primary cursor-pointer">About</h2>
                <h2 className="hover:scale-105 hover:text-primary cursor-pointer">Services</h2>
            </div>
        </div>
        <div>
            <Button>Login/Register</Button>
        </div>
    </div>
  )
}

export default Header