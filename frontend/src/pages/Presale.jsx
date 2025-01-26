import React from 'react'
import TokenInfo from '../components/TokenInfo'

const Presale = () => {
  return (
    <div className='pt-24'>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 lg:col-span-1 flex border rounded-2xl px-7 py-3">          
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Quantity</span>
              <span className="label-text-alt">Top Right label</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
            <div className="label">
              <span className="label-text-alt">Bottom Left label</span>
              <span className="label-text-alt">Bottom Right label</span>
            </div>
          </label>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <TokenInfo />
        </div>
      </div>
    </div>
  )
}

export default Presale