import React from 'react';
import './content.css';

export default function Content({height, value}) {
  return (
    <div className="Content" style={{height: height - 40, overflow: 'auto'}}>
      {value}
    </div>
  );
}
