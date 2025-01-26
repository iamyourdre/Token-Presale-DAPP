import React, { useState, useEffect, useContext } from 'react';
import Loading from '../components/Loading';
import { ContractContext } from '../contexts/ContractContext';

const TokenInfo = () => {
  const { loading, tokenInfo, setTokenInfo, contract, decimalConversion } = useContext(ContractContext);

  return (    
    <div>
      <div className="stats stats-vertical border flex flex-col">
        {loading ? 
          <div className="stat">
            <div className="stat-title">Token Name</div>
            <div className="stat-value "><Loading /></div>
          </div>
        : 
          <>
            <div className="stat">
              <div className="stat-title">Token Name</div>
              <div className="stat-value ">{tokenInfo.name}</div>
              <div className="stat-desc ">${tokenInfo.symbol}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Supply</div>
              <div className="stat-value">{decimalConversion(tokenInfo.totalSupply, tokenInfo.decimals)}</div>
              <div className="stat-desc">${tokenInfo.symbol}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Decimals</div>
              <div className="stat-value">{tokenInfo.decimals.toString()}</div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default TokenInfo