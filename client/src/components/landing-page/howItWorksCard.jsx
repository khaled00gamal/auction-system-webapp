import '../styles/HowItWorksCard.css';

function HowItWorksCard(props) {

  return (
    <div className='col-how-it-works'>
      <img
        className='placeholder-img'
        src={props.image}
        alt='placeholder-img'
      />
      <p className='introduction-text'>{props.text}</p>
    </div>
  );
}

export default HowItWorksCard;
