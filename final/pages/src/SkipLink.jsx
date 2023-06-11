import React, { useRef } from 'react';

function SkipLink ({ targetId, label }) {
    const targetRef = useRef(null);

    const handleClick = (event) => {
        event.preventDefault();
        targetRef.current?.focus();
      };
    
    return(
    <a href={`${targetId}`}
      className="skip"
      onClick={handleClick}>
      <span ref={targetRef} tabIndex="0">
        {label}
      </span>
    </a>
    );
}
export default SkipLink;