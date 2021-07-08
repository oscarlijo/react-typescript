import { createStore, applyMiddleware, Store } from "redux"
import filmsReducer from '../reducers/films.reducer';
import thunk from "redux-thunk"

export const store: Store<FilmState, FilmAction> & {
  dispatch: DispatchType
} = createStore(filmsReducer, applyMiddleware(thunk))