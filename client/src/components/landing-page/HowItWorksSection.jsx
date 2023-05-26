import HowItWorksCard from './howItWorksCard';
import '../styles/HowItWorksSection.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

function HowItWorksSection() {
  return (
    <div className='how-it-works-div'>
      <Container>
        <Row><h1 className='header-how-it-works' style={{ textAlign: 'center' }}>HOW IT WORKS</h1></Row>
        <Row className='row-how-it-works'>
          <Col className='col-how-it-works-1'>
            <HowItWorksCard image="https://www.printableparadise.com/numbers/printable-number-1-silhouette.png" text="test" />
          </Col>
          <Col className='col-how-it-works-2'>
            <HowItWorksCard image="https://pngimg.com/uploads/number2/Number%202%20PNG%20images%20free%20download_PNG14925.png" text="test" />
          </Col>
          <Col className='col-how-it-works-3'>
            <HowItWorksCard image="https://www.nicepng.com/png/detail/38-385284_number-3-png-number-3-transparent-background.png" text="test" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HowItWorksSection;
