import { ActionType } from 'typesafe-actions';

import Types from 'Types';

import { FETCH_CHORDS, RECORD_CHORD_CHANGE_SCORE, FETCH_CHORD_CHANGE_SCORES } from '../actions/actionTypes';
import * as actions from '../actions/chords';

export interface ChordState {
  chords: Types.Chord[];
  chordChangeScores: Types.ChordChangeScore[];
}

export type ChordAction = ActionType<typeof actions>;

const initialState: ChordState = {
  chords: [],
  chordChangeScores: [],
};

const reducer = (state = initialState, action: ChordAction) => {
  switch (action.type) {
    case FETCH_CHORDS:
      return <ChordState>{
        ...state,
        chords: action.payload,
      }
    case FETCH_CHORD_CHANGE_SCORES:
      return <ChordState>{
        ...state,
        chordChangeScores: action.payload,
      }
    case RECORD_CHORD_CHANGE_SCORE:
      return <ChordState>{
        ...state,
        chordChangeScores: state.chordChangeScores.concat([action.payload]),
      }
    default:
      return state;
  }
}

export default reducer;