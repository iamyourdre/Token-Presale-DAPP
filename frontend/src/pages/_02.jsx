import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import useWallet from '../hooks/useWallet';
import IncrementerABI from '../abi/_02/Incrementer2.json';
import Loading from '../components/Loading';
import { showToastPromise } from '../utils/toastUtils';
import ConnectWallet from '../components/ConnectWallet';

const _02 = () => {
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
          '0x3e64a664e96F2266ff757cAa71Be16E396eD2BDE' // (change to your own contract address)
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
      const sendTx = contract.methods.increment(1).send({ from: wallet })
      .then(async (result) => {
        const value = await contract.methods.getNumber().call();
        setNumber(value);
        return result;
      });
      showToastPromise(sendTx).finally(() => {
        setLoadingIncrement(false);
      });
    }
  };

  const reset = async () => {
    if (contract && wallet) {
      setLoadingReset(true);
      const sendTx = contract.methods.reset().send({ from: wallet })
      .then(async (result) => {
        const value = await contract.methods.getNumber().call();
        setNumber(value);
        return result;
      });
      showToastPromise(sendTx).finally(() => {
        setLoadingReset(false);
      });
    }
  };

  return (
    <div className='h-screen justify-center items-center flex flex-col gap-8'>
      <h1 className='text-2xl font-medium'>Incrementer</h1>
      <p className='text-8xl'>{number.toString()}</p>
      <div className="flex gap-4">
        {!wallet ?
          <ConnectWallet /> : (
          <>          
            <button onClick={reset} disabled={loadingReset} className='btn btn-outline btn-neutral'>
            {loadingReset ? <><Loading /> Reseting...</> : 'Reset'}
            </button>
            <button onClick={increment} disabled={loadingIncrement} className='btn btn-neutral'>
              {loadingIncrement ? <><Loading /> Incrementing...</> : '+1'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default _02;