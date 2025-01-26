import React, { useState, useEffect, useContext } from 'react';
import Loading from '../components/Loading';
import { ContractContext } from '../contexts/ContractContext';

const TokenInfo = () => {
  const { loading, tokenInfo, presale, decimalConversion } = useContext(ContractContext);

  return (    
    <div>
      <div className="stats stats-vertical border flex flex-col">
        {loading ? 
          <div className="stat">
            <div className="stat-title">Loading Token Information</div>
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
              <div className="stat-title">Presale Left</div>
              <div className="stat-value">{decimalConversion(presale.presaleSupply, tokenInfo.decimals)}</div>
              <div className="stat-desc">of {decimalConversion(tokenInfo.totalSupply, tokenInfo.decimals)} ${tokenInfo.symbol}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Decimals</div>
              <div className="stat-value">{tokenInfo.decimals !== null && tokenInfo.decimals !== undefined ? tokenInfo.decimals.toString() : 'N/A'}</div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default TokenInfo