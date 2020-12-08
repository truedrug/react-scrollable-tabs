import React from 'react';
import './backdrop.css';

export default function Backdrop({show, backdropClicked}) {
  return show ? (
    <div className="backdrop" onClick={backdropClicked}></div>
  ) : null;
}
