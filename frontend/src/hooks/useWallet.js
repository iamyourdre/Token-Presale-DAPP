import { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { WalletContext } from '../contexts/WalletContext';

const useWallet = () => {
  const { wallet, setWallet } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      setLoading(true);
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setWallet(accounts[0]);

        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID
        });
      } catch (error) {
        console.error("Error connecting to wallet", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setWallet(accounts[0]);

          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID
          });
        }
      }
    };

    checkWalletConnection();
  }, [setWallet]);

  return { wallet, connectWallet, disconnectWallet, loading };
};

export default useWallet;