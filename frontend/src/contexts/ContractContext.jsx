import React, { createContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import Address from '../abi/address.json';
import TokenABI from '../abi/Token.sol/SimpleToken.json';

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [web3, setWeb3] = useState(null);
  const [tokenInfo, setTokenInfo] = useState({
    totalSupply: null,
    name: null,
    symbol: null,
    decimals: null,
  });
  const [contract, setContract] = useState(null);
  
  useEffect(() => {
    const initWeb3 = async () => {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const contractInstance = new web3Instance.eth.Contract(
        TokenABI.abi,
        Address.TOKEN_ADDRESS
      );
      setContract(contractInstance);
    };
    initWeb3();
  }, []);
  
  useEffect(() => {
    if (contract) {
      const fetchTokenInfo = async () => {
        const totalSupply = await contract.methods.totalSupply().call();
        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol().call();
        const decimals = await contract.methods.decimals().call();

        setTokenInfo({
          totalSupply,
          name,
          symbol,
          decimals,
        });
        setLoading(false);
      };
      fetchTokenInfo();
    }
  }, [contract]);
  
  const decimalConversion = (value, decimal) => {
    return (Number(value) / 10 ** Number(decimal));
  }

  return (
    <ContractContext.Provider value={{ loading, tokenInfo, setTokenInfo, contract, decimalConversion }}>
      {children}
    </ContractContext.Provider>
  );
};