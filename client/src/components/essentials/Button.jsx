import React from "react";
import "../styles/Button.css";

/*
the way a button style is selected is through this naming convention:
button-size-style

size and style are necessary conditions when using this component
*/

function Button(props) {
  let variant = "button";

  if (props.size) {
    variant = variant + "-" + props.size;
  }

  if (props.style) {
    variant = variant + "-" + props.style;
  }

  //let variant = "button-" + props.size + "-" + props.style;
  return (
    <a className={variant} href={props.link} style={{ minWidth: props.width }}>
      {props.text}
    </a>
  );
}

export default Button;