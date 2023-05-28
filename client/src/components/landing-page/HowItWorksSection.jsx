import HowItWorksCard from './howItWorksCard';
import '../styles/HowItWorksSection.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

function HowItWorksSection() {
  return (
    <Container className='how-it-works-container'>
      <Container className='how-it-works-heading'>
        <Row className='how-it-works-heading-row'>
          <Col>
            <h3>HOW IT WORKS</h3>
          </Col>
        </Row>
      </Container>
      <Container className='how-it-works-cards'>
        <Col className="how-it-works-card" lg={3} md={8} sm={4}>
          <HowItWorksCard image="how-it-works-1.jpg" text="Browse and Discover" />
        </Col>
        <Col className="how-it-works-card" lg={3} md={8} sm={4}>
          <HowItWorksCard image="how-it-works-1.jpg" text="Place Your Bid" />
        </Col>
        <Col className="how-it-works-card" lg={3} md={8} sm={4}>
          <HowItWorksCard image="how-it-works-1.jpg" text="Enjoy a Secure Auction Experience" />
        </Col>
      </Container>
    </Container>
  );
}

export default HowItWorksSection;
