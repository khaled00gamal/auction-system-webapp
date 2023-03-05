//will render the whole app
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landing-page/LandingPage";
import SignIn from "./sign-in/SignIn";

function App() {
  return (
    <div>
      <h1>a7a</h1>
      <Router>
        <Routes>
          <Route exact path="/" component={LandingPage} />
          <Route path="/signin" component={SignIn} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
