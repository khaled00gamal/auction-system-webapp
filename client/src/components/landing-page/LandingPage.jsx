import Footer from './Footer';
import FirstSection from './FirstSection';
import HowItWorksSection from './HowItWorksSection';
import LastSection from './LastSection';
import {Carousel} from './Carousel'
import "./styling.css";

function LandingPage() {
  return (
    <div className='landing-page-content'>
      <FirstSection />
      {/* <HowItWorksSection /> */}
      <Carousel />
      <LastSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
