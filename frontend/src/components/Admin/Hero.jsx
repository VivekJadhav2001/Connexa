import React from 'react'

const Hero = ({ userData }) => {

    return (
        <div className='w-full h-full bg-orange-300 rounded-sm'>
            <div className='px-2 pb-10 bg-orange-200 w-50 text-center pt-4 font-bold ml-2 mt-2 rounded-xl'>
                Total Users  <br />
                {userData.length}
                {/* <img className='rounded-xl' src="https://assets.lummi.ai/assets/QmUXr5n9CYNJeYMES94tHBYd7aitTRW6TxKrUem2K5t3Xv?auto=format&w=1500" alt="hero-admin" /> */}
            </div>
        </div>
    )
}

export default Hero