import React from 'react';
import Card from './Card';

// destructuring from robots.js
const CardList = ({ robots }) => {
  // still throws error because in development mode
  // if (true) {
  //   throw new Error('NOOO!');
  // }
  return (
    // second parameter, index
    <div>
      {robots.map((user, i) => {
        // key prop should not change;
        return (
          <Card key={i} id={user.id} name={user.name} email={user.email} />
        );
      })}
    </div>
  );
};

export default CardList;
