import React from "react";
import "../styles/Button.css";

function Button(props) {
  let variant = "button-" + props.size;
  console.log(variant);

  return (
    <a className={variant} href={props.link}>
      {props.text}
    </a>
  );
}

export default Button;