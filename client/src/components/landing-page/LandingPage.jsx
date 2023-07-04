import Footer from './Footer';
import FirstSection from './FirstSection';
import Features from './Features';
import HowItWorksSection from './HowItWorksSection';
import LastSection from './LastSection';
import { Carousel } from './Carousel'
import NavBar from './NavBar';
import FeaturesBlocks from './FeaturesBlock';
//import "./styling.css";

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
      <NavBar />
      <FirstSection />
      <Features />
      <FeaturesBlocks />
      {/*<LastSection />*/}
      <Footer />
    </div>
  );
}

export default LandingPage;
