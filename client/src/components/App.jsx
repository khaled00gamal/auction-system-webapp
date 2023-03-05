//will render the whole app
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landing-page/LandingPage";
import SignIn from "./sign-in/SignIn";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>

    </Router>


  );
}

export default App;
