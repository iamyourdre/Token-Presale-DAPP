import { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { WalletContext } from '../contexts/WalletContext';

const useWallet = () => {
  const { wallet, setWallet } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);
  const [etherBalance, setBalance] = useState(null);
  const [shouldAutoConnect, setShouldAutoConnect] = useState(true);

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

        const etherBalance = await web3.eth.getBalance(accounts[0]);
        setBalance(web3.utils.fromWei(etherBalance, 'ether'));
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
    setBalance(null);
    setShouldAutoConnect(false);
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (shouldAutoConnect) {
        connectWallet();
      }
    };

    checkWalletConnection();
  }, [shouldAutoConnect, setWallet]);

  return { wallet, connectWallet, disconnectWallet, loading, etherBalance };
};

export default useWallet;