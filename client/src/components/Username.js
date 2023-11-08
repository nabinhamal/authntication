import React from 'react'
import { Link } from 'react-router-dom'

const Username = () => {
  return (
    <div className='container mx-auto'>
        <div className='flex  h-screen'>
            <div>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold '>hello</h4>
                    <span className='py-4 text-cl w-2/3 text-center text-grey-500'>Explore more</span>
                </div>
                <form className='flex-1'>
                    <div className='profile flex justify-center py-4'>
                        <img src="" alt="avatar"/> 
                    </div>
                    <div className='textbox flex flex-col items-center gap-6' >
                        <input type='text' placeholder='Username'/>
                        <button type='submit'>Lets Go</button>

                    </div>
                    <div className="text-center py-4">
                        <span className="text-grey-500">Not a member <Link to="/register" className="text-red-500">Register</Link></span>
                    </div>
                </form>
            </div>

        </div>
    </div>
  )
}

export default Username