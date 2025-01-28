import toast from 'react-hot-toast';

export const showToastPromise = (promise) => {
  return toast.promise(
    promise,
    {
      loading: 'Sending Transaction...',
      success: (result) => {
        const transactionHash = result.transactionHash;
        return (
          <p>
            Done!&nbsp;
            <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noreferrer" className='font-bold underline'>View on Etherscan</a>
          </p>
        );
      },
      error: 'Something went wrong!'
    },
    {
      duration: 10000,
    }
  );
};