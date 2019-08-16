import React from 'react';

import Types from 'Types';

import styles from './scoreSquare.scss';


interface ScoreSquareProps {
  chordOne: Types.Chord;
  chordTwo: Types.Chord;
  score: number;
  onClick: (...args: any[]) => any;
}

export const ScoreSquare = (props: ScoreSquareProps) => {
  return (
    <div 
      className={ styles.scoreSquare }
      onClick={ () => props.onClick(props.chordOne, props.chordTwo) }
    >
      { props.score }
    </div>
  )
}