import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { FireBaseConfig } from './keys';

firebase.initializeApp(FireBaseConfig);

const db = firebase.firestore()

export const chordsCollection = db.collection('chords');
export const scoresCollection = db.collection('scores');