import React from 'react';
import '../styles/Button.css';

/*
the way a button style is selected is through this naming convention:
button-size-style-color

size and style are necessary conditions when using this component
*/

function Button(props) {
  let variant = 'button';

  if (props.size) {
    variant = variant + '-' + props.size;
  }

  if (props.style) {
    variant = variant + '-' + props.style;
  }

  if (props.color) {
    variant = variant + '-' + props.color;
  }
 
  const href = props.link.startsWith('http') ? props.link : `${window.location.origin}${props.link}`;

  //let variant = "button-" + props.size + "-" + props.style;
  return (
    <a
      className={variant}
      onClick={props.link}
      href={props.link}
      style={{ minWidth: props.width }}
    >
      {props.text}
    </a>
  );
}

export default Button;
