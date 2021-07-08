import * as actionTypes from "../store/actionTypes"

const initialState: FilmState = {
  films: [
    {
      title: "Title 1",
      rating: 2,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores est cumque totam, ipsam quisquam asperiores cupiditate harum perferendis exercitationem fugiat a! Explicabo commodi atque odit veniam nisi sit debitis dolore."
    },
    {
      title: "Title 2",
      rating: 4.5,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores est cumque totam, ipsam quisquam asperiores cupiditate harum perferendis exercitationem fugiat a! Explicabo commodi atque odit veniam nisi sit debitis dolore."
    },
  ],
}

const reducer = (
  state: FilmState = initialState,
  action: FilmAction
): FilmState => {
  switch (action.type) {
    case actionTypes.ADD_FILM:
      const newFilm: IFilm = {
        title: action.film.title,
        rating: action.film.rating,
        description: action.film.description,
      }
      return {
        ...state,
        films: state.films.concat(newFilm),
      }
    case actionTypes.REMOVE_FILM:
      const updatedFilms: IFilm[] = state.films.filter(
        film => film.id !== action.film.id
      )
      return {
        ...state,
        films: updatedFilms,
      }
  }
  return state
}

export default reducer