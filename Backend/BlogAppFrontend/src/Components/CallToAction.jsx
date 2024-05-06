import { Button } from 'flowbite-react'
import React from 'react'

function CallToAction() {
  return (
    <div className=" flex flex-col sm:flex-row p-3 border border-teal-500 justify-center rounded-tl-3xl rounded-br-3xl text-center ">
        <div className='flex-1 justify-center flex flex-col '>
            <h2 className="text-5xl font-semibold"> Github</h2>
            <p className='text-gray-500 my-2'>All my projects are here </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                    Welcome to my Github
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://assets-global.website-files.com/636953b3e258388b531936b5/6501a26cfbfedfb34fb423bd_git-hub-bg.jpg" alt="" srcset="" />
        </div>
    </div>
  )
}

export default CallToAction