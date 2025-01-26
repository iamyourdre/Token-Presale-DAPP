import React, { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../contexts/ContractContext';
import Loading from './Loading';
import useWallet from '../hooks/useWallet';
import ConnectWallet from './ConnectWallet';

const Buy = () => {
  const { loading: contractLoading, web3, tokenInfo, presale, presaleContract, decimalConversion } = useContext(ContractContext);

  const [ethValue, setEthValue] = useState("0");
  const [buyValue, setBuyValue] = useState("0");
  const {loading: walletLoading, wallet, balance} = useWallet();

  const handleEthValueChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,18}$/.test(value)) {
      setEthValue(value);
      if (presale && presale.rate) {
        setBuyValue((Number(value) * Number(presale.rate)).toString());
      }
    }
  };

  const handleBuyValueChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,18}$/.test(value)) {
      setBuyValue(value);
      if (presale && presale.rate) {
        setEthValue((Number(value) / Number(presale.rate)).toString());
      }
    }
  };

  const handleBuy = async () => {
    if (!wallet || !presaleContract) return;

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      await presaleContract.methods.buyTokens(account).send({
        from: account,
        value: web3.utils.toWei(ethValue, 'ether')
      });

      alert('Purchase successful!');
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    }
  };

  return (
    <div className='flex flex-col gap-4 relative'>
      {contractLoading && 
        <>
          <div className="w-full h-full absolute bg-white opacity-75 justify-center items-center flex">
            <Loading />
          </div>
        </>
      }   
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Buy With</span>
          <span className="label-text-alt">You have {balance ? balance.slice(0, 6) : 0} $ETH</span>
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <input 
            type="text" 
            className="grow" 
            placeholder="0.00" 
            value={ethValue}
            onChange={handleEthValueChange}
          />
          $ETH
        </label>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">You'll Get</span>
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <input 
            type="text" 
            className="grow" 
            placeholder="0.00" 
            value={buyValue}
            onChange={handleBuyValueChange}
          />
          {contractLoading ? '-' : '$'+tokenInfo.symbol}
        </label>
      </label>
      {!wallet ? <ConnectWallet /> : 
        <button className='btn btn-neutral' onClick={handleBuy}>
          Buy
        </button>
      }
    </div>
  )
}

export default Buy