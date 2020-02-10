import React from 'react';
// props, state, and children...

const Scroll = props => {
  // must camelCalse for JSX; instead of overflow-y it's overflowY
  return (
    <div
      style={{
        overflowY: 'scroll',
        border: '1px solid black',
        height: '500px'
      }}
    >
      {props.children}
    </div>
  );
};

export default Scroll;
