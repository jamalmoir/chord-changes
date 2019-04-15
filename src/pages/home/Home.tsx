import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { firestore } from 'firebase';

import Types from 'Types';

import { Heading } from '../../components/Heading';
import { ScoreSquare } from '../../components/ScoreSquare';
import { scoresCollection, chordsCollection } from '../../firebase/firebase';
import { FETCH_CHORD_CHANGE_SCORES, FETCH_CHORDS } from '../../redux/actions/actionTypes';
import { ChordAction } from '../../redux/reducers/chords';

import styles from './home.scss';

interface HomeProps {
  chords: Types.Chord[];
  chordChangeScores: Types.ChordChangeScore[];
  onFetchChords: (chords: Types.Chord[]) => null;
  onFetchChordChangeScores: (chordChangeScores: Types.ChordChangeScore[]) => null;
}

class HomePage extends Component<HomeProps> {
  extractScores = (snapshot: firestore.QuerySnapshot): Types.ChordChangeScore[] => {
    let scores: Types.ChordChangeScore[] = [];

    snapshot.forEach((doc: firestore.QueryDocumentSnapshot) => {
      let data = doc.data();

      scores.push({
        date: data.date,
        chordOne: data.chordOne,
        chordTwo: data.chordTwo,
        count: data.count
      })
    })

    return scores;
  }

  extractChords = (snapshot: firestore.QuerySnapshot): Types.Chord[] => {
    let chords: Types.Chord[] = [];

    snapshot.forEach((doc: firestore.QueryDocumentSnapshot) => {
      let data = doc.data();

      chords.push({
        name: data.name
      })
    })

    return chords;
  }

  componentDidMount() {
    if (!this.props.chords.length) {
      chordsCollection
        .get()
        .then((snapshot: firestore.QuerySnapshot) => this.props.onFetchChords(this.extractChords(snapshot)))
        .catch((err: Error) => console.error("Failed to retrieve chord list." + err.message))
    }

    if (!this.props.chordChangeScores.length) {
      scoresCollection
        .get()
        .then((snapshot: firestore.QuerySnapshot) => this.props.onFetchChordChangeScores(this.extractScores(snapshot)))
        .catch((err: Error) => console.error("Failed to retrieve scores." + err.message));
    }
  }

  buildOneRow = (start: Types.Chord) => {
    let cells = [];

    for (let i = 0; i < this.props.chords.length; i++) {
      cells.push(
        <ScoreSquare
          chordOne={start}
          chordTwo={this.props.chords[i]}
          score={0}
        />
      )
    }

    return cells;
  }

  buildRows = () => {
    let rows = [];

    for (let i = this.props.chords.length - 1; i >= 0; i--) {
      rows.push(<div className={styles.chordRow}>{this.buildOneRow(this.props.chords[i])}</div>)
    }

    return rows;
  }

  render() {
    return (
      <div className={ styles.home }>
        <Heading className={ styles.homeHeading } text="Chord Change Trainer" />
          <div className={ styles.chordGrid }>
            { this.buildRows() }
          </div>
      </div>
    )
  }
};

const mapStateToProps = (state: Types.RootState) => {
  return {
    chords: state.chord.chords,
    chordChangeScores: state.chord.chordChangeScores,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<ChordAction>) => ({
  onFetchChords: (chords: Types.Chord[]) => dispatch({ type: FETCH_CHORDS, payload: chords }),
  onFetchChordChangeScores: (chordChangeScores: Types.ChordChangeScore[]) => dispatch({ type: FETCH_CHORD_CHANGE_SCORES, payload: chordChangeScores }),
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);