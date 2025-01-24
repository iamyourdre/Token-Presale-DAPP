import React from 'react';
import useWallet from '../hooks/useWallet';
import Loading from './Loading';

const ConnectWallet = () => {
  const { wallet, connectWallet, disconnectWallet, loading } = useWallet();

  return (
    <>
      {wallet ? (
        <button className="btn rounded-full" onClick={disconnectWallet} disabled={loading}>
          🔗 {wallet.slice(0, 6)}...{wallet.slice(-4)}
        </button>
      ) : (
        <button className="btn btn-neutral rounded-full" onClick={connectWallet} disabled={loading}>
          {loading ? <Loading /> : 'Connect Wallet'}
        </button>
      )}
    </>
  );
};

export default ConnectWallet;