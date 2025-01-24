import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import useWallet from '../hooks/useWallet';
import IncrementerABI from '../abi/_01/Incrementer.json';
import Loading from '../components/Loading';

const _01 = () => {
  const { wallet } = useWallet();
  const [number, setNumber] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [loadingReset, setLoadingReset] = useState(false);
  const [loadingIncrement, setLoadingIncrement] = useState(false);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const contractInstance = new web3Instance.eth.Contract(
          IncrementerABI.abi,
          '0xBfEC74f0c18B440370e41EC0F827bA0931821591' // (change to your own contract address)
        );
        setContract(contractInstance);
      } else {
        alert('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const fetchNumber = async () => {
      if (contract) {
        const value = await contract.methods.getNumber().call();
        setNumber(value);
      }
    };

    fetchNumber();
  }, [contract]);

  const increment = async () => {
    if (contract && wallet) {
      setLoadingIncrement(true);
      try {
        await contract.methods.increment(1).send({ from: wallet });
        const value = await contract.methods.getNumber().call();
        setNumber(value);
      } catch (error) {
        console.error("Error incrementing number", error);
      } finally {
        setLoadingIncrement(false);
      }
    }
  };

  const reset = async () => {
    if (contract && wallet) {
      setLoadingReset(true);
      try {
        await contract.methods.reset().send({ from: wallet });
        const value = await contract.methods.getNumber().call();
        setNumber(value);
      } catch (error) {
        console.error("Error resetting number", error);
      } finally {
        setLoadingReset(false);
      }
    }
  };

  return (
    <div className='h-screen justify-center items-center flex flex-col gap-8'>
      <h1 className='text-2xl font-medium'>Incrementer</h1>
      <p className='text-8xl'>{number.toString()}</p>
      <div className="flex gap-4">
        <button onClick={reset} disabled={!wallet || loadingReset} className='btn btn-outline btn-neutral'>
        {loadingReset ? <><Loading /> Reseting...</> : 'Reset'}
        </button>
        <button onClick={increment} disabled={!wallet || loadingIncrement} className='btn btn-neutral'>
          {loadingIncrement ? <><Loading /> Incrementing...</> : 'Increment'}
        </button>
      </div>
    </div>
  );
};

export default _01;