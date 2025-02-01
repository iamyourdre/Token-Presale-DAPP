import React from 'react'
import ConnectWallet from './ConnectWallet'
import { Link } from 'react-router-dom'
import { FaBars, FaEthereum } from 'react-icons/fa6'

const Navbar = () => {
  const navLinks = [
    {
      name: 'Homepage',
      url: '/'
    },
    {
      name: 'Presale',
      url: '/presale'
    }

  ]
  return (
    <>
      <div className="navbar bg-base-100 absolute px-5 lg:px-20 py-3 z-50">
        <div className="navbar-start gap-3">
          <div className="dropdown">

            <FaBars tabIndex={0} role="button" className='hover:text-pink-400 text-xl'/>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.url}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to={'/'} className="text-xl font-medium">
            <span className='font-bold'>D<FaEthereum className='inline w-2.5' />pp</span>Learning
          </Link>
        </div>
        <div className="navbar-end">
          <ConnectWallet />
        </div>
      </div>
    </>
  )
}

export default Navbar