//will render the whole app
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landing-page/LandingPage";
import SignIn from "./sign-in/SignIn";
import FAQ from "../components/Footer-pages/FAQ";
import Support from "../components/Footer-pages/Support";
import NavBar from "./essentials/NavBar";
import Card from "./essentials/Card";
import Dashboard from "./dashboard/Dashboard";
import Carousel from "./essentials/Carousel";
import ViewItem from "./dashboard/view item/ViewItem";
import NewAuction from "./dashboard/new auction/NewAuction";
import logo from "./icons/logo-navbar-white.svg"


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/support" element={<Support />}></Route>
        <Route path="/dashboard/:userAddress" element={<Dashboard />}></Route>
      </Routes>

    </Router>


  );
}




export default App;