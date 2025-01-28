import React, { createContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import Address from '../abi/address.json';
import TokenABI from '../abi/Token.sol/SimpleToken.json';
import PresaleABI from '../abi/Presale.sol/Presale.json';

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
  const [presale, setPresale] = useState({
    rate: null,
    wallet: null,
    token: null,
    presaleSupply: null
  });
  const [tokenContract, setTokenContract] = useState(null);
  const [presaleContract, setPresaleContract] = useState(null);
  
  useEffect(() => {
    const initWeb3 = async () => {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const tokenContractInstance = new web3Instance.eth.Contract(
        TokenABI.abi,
        Address.TOKEN_ADDRESS
      );
      setTokenContract(tokenContractInstance);

      const presaleContractInstance = new web3Instance.eth.Contract(
        PresaleABI.abi,
        Address.PRESALE_ADDRESS
      );
      setPresaleContract(presaleContractInstance);
    };
    initWeb3();
  }, []);
  
  useEffect(() => {
    if (tokenContract) {
      const fetchTokenInfo = async () => {
        const totalSupply = await tokenContract.methods.totalSupply().call();
        const name = await tokenContract.methods.name().call();
        const symbol = await tokenContract.methods.symbol().call();
        const decimals = await tokenContract.methods.decimals().call();

        setTokenInfo({
          totalSupply,
          name,
          symbol,
          decimals,
        });
      };
      fetchTokenInfo();
    }
  }, [tokenContract]);
  
  useEffect(() => {
    if (presaleContract) {
      const fetchPresaleInfo = async () => {
        const rate = await presaleContract.methods.rate().call();
        const owner = await presaleContract.methods.owner().call();
        const token = await presaleContract.methods.token().call();
        const presaleSupply = await tokenContract.methods.balanceOf(Address.PRESALE_ADDRESS).call();
        const weiRaised = await presaleContract.methods.weiRaised().call();

        setPresale({
          rate,
          owner,
          token,
          weiRaised,
          presaleSupply
        });
        setLoading(false);
      };
      fetchPresaleInfo();
    }
  }, [presaleContract]);
  
  const decimalConversion = (value, decimal) => {
    return (Number(value) / 10 ** Number(decimal));
  }

  return (
    <ContractContext.Provider value={{ loading, web3, tokenInfo, presale, presaleContract, decimalConversion }}>
      {children}
    </ContractContext.Provider>
  );
};