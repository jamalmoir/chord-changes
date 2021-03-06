import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { firestore } from 'firebase';

import Types from 'Types';

import { Heading } from '../../components/Heading';
import { ChordChangeScoreGrid } from '../../components/ChordChangeScoreGrid';
import { ChordChangeModal } from '../../components/ChordChangesModal';
import { scoresCollection, chordsCollection } from '../../firebase/firebase';
import { FETCH_CHORD_CHANGE_SCORES, FETCH_CHORDS } from '../../redux/actions/actionTypes';
import { ChordAction } from '../../redux/reducers/chords';

import styles from './home.scss';

interface HomeProps {
  chords: Types.Chord[];
  scores: Types.ChordChangeScore[];
  onFetchChords: (chords: Types.Chord[]) => null;
  onFetchChordChangeScores: (chordChangeScores: Types.ChordChangeScore[]) => null;
}

interface HomeState {
  currentChordA: Types.Chord;
  currentChordB: Types.Chord;
  modalIsOpen: boolean;
}

class HomePage extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      currentChordA: null,
      currentChordB: null,
      modalIsOpen: false
    }
  }

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

    if (!this.props.scores.length) {
      scoresCollection
        .get()
        .then((snapshot: firestore.QuerySnapshot) => this.props.onFetchChordChangeScores(this.extractScores(snapshot)))
        .catch((err: Error) => console.error("Failed to retrieve scores." + err.message));
    }
  }

  openChordChangeModal = (chordA: Types.Chord, chordB: Types.Chord) => {
    this.setState((prevState: HomeState) => {
      return {
        ...prevState,
        currentChordA: chordA,
        currentChordB: chordB,
        modalIsOpen: true
      }
    })
  }

  render() {
    return (
      <div className={ styles.home }>
        <Heading className={ styles.homeHeading } text="Chord Change Trainer" />
        <ChordChangeModal
          isOpen={ this.state.modalIsOpen }
          chordA={ this.state.currentChordA }
          chordB={ this.state.currentChordB }
        />
        <ChordChangeScoreGrid 
          chords={ this.props.chords }
          scores={ this.props.scores }
          onScoreSquareClick={ this.openChordChangeModal }
        />
      </div>
    )
  }
};

const mapStateToProps = (state: Types.RootState) => {
  return {
    chords: state.chord.chords,
    scores: state.chord.chordChangeScores,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<ChordAction>) => ({
  onFetchChords: (chords: Types.Chord[]) => dispatch({ type: FETCH_CHORDS, payload: chords }),
  onFetchChordChangeScores: (chordChangeScores: Types.ChordChangeScore[]) => dispatch({ type: FETCH_CHORD_CHANGE_SCORES, payload: chordChangeScores }),
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);