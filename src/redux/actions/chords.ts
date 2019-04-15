import { FETCH_CHORDS, RECORD_CHORD_CHANGE_SCORE, FETCH_CHORD_CHANGE_SCORES } from './actionTypes';
import { action } from 'typesafe-actions';

import Types from 'Types';

export const fetchChords = (chords: Types.Chord[]) => action(FETCH_CHORDS, chords);
export const recordChordChanges = (chordChangeScore: Types.ChordChangeScore) => action(RECORD_CHORD_CHANGE_SCORE, chordChangeScore);
export const fetchChordChanges = (chordChangeScores: Types.ChordChangeScore[]) => action(FETCH_CHORD_CHANGE_SCORES, chordChangeScores)

//chordscoresRef.push().set(chordChangeScore);