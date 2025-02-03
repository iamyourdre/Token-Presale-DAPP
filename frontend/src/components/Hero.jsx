import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import cube3d from '../assets/3d-glassy-cube-of-square-blocks.webm';
import './Hero.css';
import { FaEthereum, FaGithub } from "react-icons/fa6";
import { ContractContext } from '../contexts/ContractContext';

const Hero = () => {
  const { tokenInfo } = useContext(ContractContext);
  return (
    <div className="grid grid-cols-5 pt-28 md:pt-0 items-center justify-center min-h-screen">
      <div className="col-span-5 md:col-span-3">
        <div className="flex flex-col relative gap-3">
          <p class="flex text-5xl lg:text-6xl font-extrabold">
            <span class="absolute">
              <span class="blur-xl block
                bg-gradient-to-r from-purple-600 via-pink-400 to-blue-400 to-90%
                bg-clip-text box-content text-transparent select-none">
                ${tokenInfo.symbol} Presale
              </span>
              Is Live Now!
            </span>
            <span class="relative">
              <span class="relative block pb-2.5
                bg-gradient-to-r from-purple-600 via-pink-400 to-blue-400 to-90%
                bg-clip-text text-transparent select-auto">
                ${tokenInfo.symbol} Presale
              </span>
              <span className='relative -top-2.5'>Is Live Now!</span>
            </span>
          </p>
          <p className='text-xl'>
            Join the presale and be part of our exciting new cryptocurrency project. Get your tokens now and enjoy exclusive benefits!
          </p>
          <div className="flex pt-4">
          <Link to={'/presale'} className='btn bg-gradient-to-r from-pink-400 to-purple-400 to-90% btn-lg rounded-full text-white'>
            <FaEthereum/>
            Buy Tokens
          </Link>
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