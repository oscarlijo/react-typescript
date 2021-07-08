import * as actionTypes from "./actionTypes"

export function addFilm(film: IFilm) {
  const action: FilmAction = {
    type: actionTypes.ADD_FILM,
    film,
  }

  return simulateHttpRequest(action)
}

export function removeFilm(film: IFilm) {
  const action: FilmAction = {
    type: actionTypes.REMOVE_FILM,
    film,
  }
  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: FilmAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}
