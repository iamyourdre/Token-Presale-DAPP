import React, { useContext } from 'react'
import cube3d from '../assets/3d-glassy-cube-of-square-blocks.webm';
import './Hero.css';
import { FaGithub } from "react-icons/fa6";
import { ContractContext } from '../contexts/ContractContext';

const Hero = () => {
  const { tokenInfo } = useContext(ContractContext);
  return (
    <div className="grid grid-cols-5 pt-28 md:pt-0 items-center justify-center min-h-screen">
      <div className="col-span-5 md:col-span-3">
        <div className="flex flex-col relative gap-3">
          <p class="flex text-5xl lg:text-6xl font-extrabold">
            <span class="absolute">
              Welcome to
              <span class="blur-xl block
                bg-gradient-to-r from-purple-600 via-pink-400 to-blue-400 to-90%
                bg-clip-text box-content text-transparent select-none">
                ${tokenInfo.symbol} Presale
              </span>
              Event
            </span>
            <span class="relative">
              Welcome to
              <span class="relative block pb-2.5
                bg-gradient-to-r from-purple-600 via-pink-400 to-blue-400 to-90%
                bg-clip-text text-transparent select-auto">
                ${tokenInfo.symbol} Presale
              </span>
              <span className='relative -top-2.5'>Event</span>
            </span>
          </p>
          <p className='text-xl'>
            Join the presale of $BGT (Bebek Goreng Token) and be part of an exciting new cryptocurrency project. Get your tokens now and enjoy exclusive benefits!
          </p>
          <div className="flex pt-4">
          <button className='btn btn-neutral btn-lg'>
            <FaGithub /> View on GitHub
          </button>
          </div>
        </div>
      </div>
      <div className="col-span-5 md:col-span-2 flex relative">
        <div className="w-full h-full overflow-hidden">
          <video className="scale-video" autoPlay loop muted playsInline>
            <source src={cube3d} type="video/webm"/>
          </video>
        </div>
      </div>
    </div>
  )
}

export default Hero