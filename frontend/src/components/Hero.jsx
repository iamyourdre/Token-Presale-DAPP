import React from 'react'
import cube3d from '../assets/3d-glassy-cube-of-square-blocks.webm';
import './Hero.css';
import { FaGithub } from "react-icons/fa6";

const Hero = () => {
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
                Dapp Learning
              </span>
              Documentation
            </span>
            <span class="relative">
              Welcome to
              <span class="relative block pb-2.5
                bg-gradient-to-r from-purple-600 via-pink-400 to-blue-400 to-90%
                bg-clip-text text-transparent select-auto">
                Dapp Learning
              </span>
              <span className='relative -top-2.5'>Documentation</span>
            </span>
          </p>
          <p className='text-xl'>
            Relax, it's just my simple learning documentation about DApp development. It might not be perfect, but it's a good start.
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