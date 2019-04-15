import { ReactNode } from 'react';
import { Action, AnyAction, Dispatch } from 'redux';
import { StateType } from 'typesafe-actions';

import rootReducer from '../redux/reducer';
import {AppState, AppAction} from '../redux/reducers/app'
import { AuthState, AuthAction } from '../redux/reducers/auth';
import { ChordState, ChordAction } from '../redux/reducers/chords';
import { CallHistoryMethodAction } from 'connected-react-router';


declare module 'Types' {
  export interface RootState {
    readonly app: AppState;
    readonly auth: AuthState;
    readonly chord: ChordState;
  }

  export type RootAction = AppAction | AuthAction | ChordAction | CallHistoryMethodAction;

  export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
  }

  export interface Chord {
    name: string;
  }

  export interface ChordChangeScore {
    date: Date,
    chordOne: Chord,
    chordTwo: Chord,
    count: number,
  }
}