//will render the whole app
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landing-page/LandingPage';
import SignIn from './sign-in/SignIn';
import FAQ from '../components/Footer-pages/FAQ';
import Support from '../components/Footer-pages/Support';
import Dashboard from './dashboard/Dashboard';
import NewAuction from './dashboard/new auction/NewAuction';
import Web3Provider from '../high-order components/Web3Provider';
import ViewAuction from './dashboard/view auction/ViewAuction';
import Bidding from './dashboard/bidding/Bidding';

function App() {
  return (
    <Web3Provider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/Signin' element={<SignIn />} />
          <Route path='/FAQ' element={<FAQ />} />
          <Route path='/Support' element={<Support />}></Route>
          <Route path='/Dashboard/' element={<Dashboard />}></Route>
          <Route path='/Dashboard/NewAuction' element={<NewAuction />}></Route>
          <Route path='/Dashboard/ViewAuction' element={<ViewAuction />}></Route>
          <Route path='/Bidding' element={<Bidding />}></Route>
          <Route path='/ViewAuction' element={<ViewAuction />}></Route>
        </Routes>
      </Router>
    </Web3Provider>
  );
}

export default App;
