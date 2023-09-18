import React from "react";
import TypeButton from "../TypeButton/TypeButton";
import { ReactComponent as Rabbit } from '../../images/rabbitIcon.svg';
import { ReactComponent as Innovation } from '../../images/innovationIcon.svg';
import { ReactComponent as ABC } from '../../images/abcIcon.svg';
import { ReactComponent as Target } from '../../images/targetIcon.svg';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <div className="typeButton-container">
        <TypeButton icon={<Rabbit />} label="Speed and Agility" />
        <TypeButton icon={<Innovation />} label="Creativity & Improvisation" />
        <TypeButton icon={<ABC />} label="Style and Vocabulary" />
        <TypeButton icon={<Target />} label="Precision & Timekeeping" />


        
      </div>
    </div>
  );
}

export default InfoPage;

//there was an <p>Info Page</p> inserted under the <div className="container"> on line 12. removed to center the typeButton
