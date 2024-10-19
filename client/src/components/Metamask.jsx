import React from 'react'
import { Link } from "react-router-dom";
import { metamask } from '../assets';

const Metamask = () => {
  return (
    <div className=" py-28 bg-hero-pattern bg-cover bg-no-repeat bg-center" >
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg mx-auto shadow-lg overflow-hidden p-0.5 gap-0.5">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-tertiary rounded-l-lg" >
            <h1 className="text-white text-3xl">Welcome Here</h1>
            <img src={metamask} alt='metamask image' className='w-44 h-44 object-contain'/>
            <p className="text-white"><b>Already heve a metamsk account ?</b></p>
            <p className="text-white text-center"><br/>Please login to your metamask account and press SignIn to proceed futher<br/><a href="#" class="text-purple-500 font-semibold">Learn more</a></p>
            <Link to='/login'>
            <button className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-lg rounded-lg px-9 py-3 mt-6 hover:drop-shadow-[0_10px_15px_rgba(255,255,255,0.2)]'>
              Sign In
            </button>
            </Link>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col p-12 bg-tertiary rounded-r-lg justify-center items-center text-white">
            <h2  className="text-3xl mb-7">New Here ?</h2>
            <p className="text-white my-5 text-center"><b>Don't heve a metamsk account ?</b></p>
            <p className="mb-4 text-center">
              Our application requires your metamask account details to work with us. 
            </p>
            <p className='text-purple-500 font-semibold my-2' >Create a new metamask account</p>
            <a href='https://metamask.io/download/' target='_blank' className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-lg rounded-lg px-9 py-3 my-4 hover:drop-shadow-[0_10px_15px_rgba(255,255,255,0.2)]'>Click Here</a> 
            <p >to create an metamask account.</p>
            <p className='text-sm text-center m-3'>Visit this <a href='https://codehs.com/tutorial/jkeesh/how-to-set-up-an-ethereum-wallet-on-metamask' target='_blank' className='underline'>Guide</a> to know step-by-step process to create a metamask account.</p>
            
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Metamask
