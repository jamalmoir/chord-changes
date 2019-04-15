import React from 'react';

import Types from 'Types';

import styles from './scoreSquare.scss';


interface ScoreSquareProps {
  chordOne: Types.Chord;
  chordTwo: Types.Chord;
  score: number;
}

export const ScoreSquare = (props: ScoreSquareProps) => {
  return (
    <div className={ styles.scoreSquare }>
      { props.score }
    </div>
  )
}