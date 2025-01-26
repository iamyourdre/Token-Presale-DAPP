// filepath: /c:/Users/iamyo/Code Box/JS_ENV/DApp-Learning/frontend/src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import Presale from './pages/Presale';
import BasicLayout from './layouts/BasicLayout';
import Index from './pages/Index';
import { ContractProvider } from './contexts/ContractContext';

function App() {
  return (
    <ContractProvider>
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BasicLayout />} >
            <Route path='/' element={<Index />} />
            <Route path='/presale' element={<Presale />} />
          </Route>
        </Routes>
      </Router>
    </WalletProvider>
    </ContractProvider>
  );
}

export default App;