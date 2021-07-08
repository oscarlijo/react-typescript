interface IFilm {
  id?: number
  title: string
  rating: number
  description: string
}

type FilmState = {
  films: IFilm[]
}

type FilmAction = {
  type: string
  film: IFilm
}

type DispatchType = (args: FilmAction) => FilmAction