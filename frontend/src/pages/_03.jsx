import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import useWallet from '../hooks/useWallet';
import TokenABI from '../abi/_03/SimpleToken.json';
import Loading from '../components/Loading';
import { showToastPromise } from '../utils/toastUtils';
import ConnectWallet from '../components/ConnectWallet';
import toast from 'react-hot-toast';

const _03 = () => {
  const [totalSupply, setTotalSupply] = useState(null);
  const [name, setName] = useState(null);
  const [symbol, setSymbol] = useState(null);
  const [decimals, setDecimals] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const contractInstance = new web3Instance.eth.Contract(
          TokenABI.abi,
          '0x6270B5432d3d4538966Fd4067322dB2dd17903cd' // (change to your own contract address)
        );
        setContract(contractInstance);
      } else {
        alert('Please install MetaMask!');
      }
    };
    initWeb3();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (contract) {
        const decimals = await contract.methods.decimals().call();
        setDecimals(decimals.toString());
        const supply = await contract.methods.totalSupply().call();
        setTotalSupply(decimalConversion(supply, decimals).toString());
        setName(await contract.methods.name().call());
        setSymbol(await contract.methods.symbol().call());
        setLoading(false);
      }
    };
    fetchData();
  }, [contract]);

  const decimalConversion = (value, decimal) => {
    return (Number(value) / 10 ** Number(decimal));
  }

  return (
    <div className='grid grid-cols-2 pt-24 gap-8'>
      <div className="col-span-2 lg:col-span-1">
      <div role="tablist" className="tabs tabs-lifted">

        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="MINT" defaultChecked/>
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Mint contract={contract} web3={web3} decimals={decimals} />
        </div>

        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="BURN" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          Tab content 3
        </div>
        
        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="BURN" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          Transfer
        </div>

      </div>
      </div>
      <div className='col-span-2 lg:col-span-1'>
        <div className="stats stats-vertical shadow flex flex-col">
          {loading ? 
            <div className="stat">
              <div className="stat-title">Token Name</div>
              <div className="stat-value "><Loading /></div>
            </div>
          : 
            <>
              <div className="stat">
                <div className="stat-title">Token Name</div>
                <div className="stat-value ">{name}</div>
                <div className="stat-desc ">${symbol}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Supply</div>
                <div className="stat-value">{totalSupply}</div>
                <div className="stat-desc">${symbol}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Decimals</div>
                <div className="stat-value">{decimals}</div>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

const Mint = ({ contract, web3, decimals }) => {
  const { wallet } = useWallet();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const mint = async () => {
    if (contract && wallet) {
      setLoading(true);
      const role = await contract.methods.hasRole('0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', wallet).call();
      console.log("role", role)
      if (!role) {
        await contract.methods.renounceRole('0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', wallet).send({ from: wallet });
        console.log("renounceRole")
      }
      // const amountWithDecimals = BigInt(amount) * BigInt(10 ** 18);
      // const sendTx = contract.methods.mint(wallet, amountWithDecimals).send({ from: wallet })
      // .then(async (result) => {
      //   const value = await contract.methods.getNumber().call();
      //   setNumber(value);
      //   return result;
      // });
      // showToastPromise(sendTx).finally(() => {
      //   setLoading(false);
      // });
    }
  };

  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Amount</span>
        </label>
        <input
          type="number"
          placeholder="Amount"
          className="input input-bordered"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>    
        <button className="btn btn-primary mt-4" onClick={mint} disabled={loading}>
          {loading ? <Loading /> : 'Mint'}
        </button>
    </div>
  );
};

export default _03;