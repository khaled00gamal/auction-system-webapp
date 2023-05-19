import React, { useEffect, useState } from 'react';
import Footer from '../landing-page/Footer';
import NavBar from '../essentials/NavBar';
import YourBidsSection from './YourBidsSection';
import TrendingAuctionsSection from './TrendingAuctionsSection';
import './Dashboard.css';
import { useWeb3 } from '../../high-order components/Web3Provider';

function Dashboard() {
  const web3Context = useWeb3();
  const [account, setAccount] = useState('');

  useEffect(() => {
    const func = async () => setAccount(await web3Context.hooks.getAccount());
    func();
  });

  return (
    <div>
      <NavBar />
      <div className='dashboard-content'>
        <h2>Welcome Back, {account}</h2>
        <div className='YourBidsSection'>
          <YourBidsSection />
        </div>
        <div className='TrendingAuctionsSection'>
          <TrendingAuctionsSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
