import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { ContractContext } from '../contexts/ContractContext';
import LoadingPage from '../components/LoadingPage';
import Hero from '../components/Hero';

const Index = () => {
  const { loading } = useContext(ContractContext);
  return (
    <>
      <Helmet>
        <title>Token Presale - $BGT</title>
      </Helmet>
      {loading ? <LoadingPage/> : <Hero/>}
    </>
  )
}

export default Index;