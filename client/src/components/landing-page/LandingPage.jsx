import Footer from './Footer';
import FirstSection from './FirstSection';
import HowItWorksSection from './HowItWorksSection';
import LastSection from './LastSection';

function LandingPage() {
  return (
    <div className='landing-page-content'>
      <FirstSection />
      <HowItWorksSection />
      <LastSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
