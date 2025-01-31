import React, { useContext } from 'react'
import Hero from '../components/Hero'
import { ContractContext } from '../contexts/ContractContext';
import LoadingPage from '../components/LoadingPage';

const Index = () => {
  const { loading } = useContext(ContractContext);
  return (
    <>
      {loading ? <LoadingPage/> :
      <Hero/>}
    </>
  )
}

export default Index