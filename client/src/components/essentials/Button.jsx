import React from "react";
import "../styles/Button.css";

function Button(props) {
  let variant = "button-" + props.size;
  return (
    <a className={variant} href={props.link} style={{ minWidth: props.width }}>
      {props.text}
    </a>
  );
}

export default Button;