import app from './reducers/app';
import auth from './reducers/auth';
import chord  from './reducers/chords';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

export default (history: History) => combineReducers({
  app,
  auth,
  chord,
  router: connectRouter(history)
});