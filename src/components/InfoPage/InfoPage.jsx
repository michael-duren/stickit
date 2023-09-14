import React from 'react';
import TypeButton from '../TypeButton/TypeButton';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      
      <div className='typeButton-container'>
      <TypeButton></TypeButton>
      </div>
    </div>
  );
}

export default InfoPage;

//there was an <p>Info Page</p> inserted under the <div className="container"> on line 12. removed to center the typeButton
