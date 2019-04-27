import React from 'react';

import Types from 'Types';

import styles from './chordChangeScoreGrid.scss';
import { ScoreSquare } from '../ScoreSquare';


interface ChordChangeScoreGridProps {
  chords: Types.Chord[];
  scores: Types.ChordChangeScore[];
}

const getScore = (chordOne: Types.Chord, chordTwo: Types.Chord, scores: Types.ChordChangeScore[]) => {
  for (let i = 0; i < scores.length; i++) {
    let score = scores[i];

    if (score.chordOne.name === chordOne.name && score.chordTwo.name === chordTwo.name) {
      return score.count;
    } else if (score.chordOne.name === chordTwo.name && score.chordTwo.name === chordOne.name) {
      return score.count;
    }
  }
}

const buildOneRow = (row: number, chords: Types.Chord[], scores: Types.ChordChangeScore[]) => {
  let cells = [],
      start = chords[row];

  for (let i = 0; i < row; i++) {
    cells.push(
      <ScoreSquare
        chordOne={ start }
        chordTwo={ chords[i] }
        score={ getScore(start, chords[i], scores) }
        key={ chords[i].name }
      />
    )
  }

  return cells;
}

const buildRows = (chords: Types.Chord[], scores: Types.ChordChangeScore[]) => {
  let rows = [];

  for (let i = chords.length - 1; i >= 0; i--) {
    rows.push(<div className={ styles.chordRow } key={ chords[i].name }>{ buildOneRow(i, chords, scores) }</div>)
  }

  return rows;
}

const buildYTicks = (chords: Types.Chord[]) => {
  let ticks = [];

  for (let i = chords.length - 1; i > 0; i--) {
    ticks.push(<div className={ styles.tick } key={ chords[i].name }>{ chords[i].name }</div>)
  }

  return ticks;
}

const buildXTicks = (chords: Types.Chord[]) => {
  let ticks = [<div className={ styles.tick } key="blank"></div>];

  for (let i = 0; i < chords.length - 1; i++) {
    ticks.push(<div className={ styles.tick } key={ chords[i].name }>{ chords[i].name }</div>)
  }

  return ticks;
}

export const ChordChangeScoreGrid = (props: ChordChangeScoreGridProps) => {
  return (
    <div className={ styles.chordChangeScoreGrid }>
      <div className={ styles.xTicks }>
        { buildXTicks(props.chords) }
      </div>
      <div className={ styles.yTicks }>
        { buildYTicks(props.chords) }
      </div>
      <div className={ styles.scoreGrid }>
        { buildRows(props.chords, props.scores) }
      </div>
    </div>
  )
}