//will render the whole app
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landing-page/LandingPage";
import SignIn from "./sign-in/SignIn";
import FAQ from "../components/Footer-pages/FAQ";
import Support from "../components/Footer-pages/Support";

function App() {
  return (


    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/support" element={<Support />}></Route>
      </Routes>

    </Router>


  );
}

export default App;