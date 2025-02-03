import React from 'react'
import TokenInfo from '../components/TokenInfo'
import Buy from '../components/Buy';
import { Helmet } from 'react-helmet';

const Presale = () => {
  return (
    <div className='pt-24'>
      <Helmet>
        <title>Buy $BGT</title>
      </Helmet>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 lg:col-span-1 border rounded-2xl px-7 py-3">
          <Buy />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <TokenInfo />
        </div>
      </div>
    </div>
  )
}

export default Presale