import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import httpClient from '../services/axios-client'
import equal from 'fast-deep-equal'
import ReactStars from 'react-stars'
import { Modal } from 'bootstrap'
import './Films.scss'
import { connect } from 'react-redux'

interface MyState {
  film: any;
  films: any[];
  original_films: any[];
  ratingStar: number;
  description: string;
}

class Films extends React.Component<{ search: string; }, MyState> {
  modalRef: any
  
  constructor(props: any) {
      super(props);
      // this.onChangeRating = this.onChangeRating.bind(this);
      this.state = { film: null, films: [], original_films: [], ratingStar: 0, description: '' };
      this.modalRef = React.createRef();
  }

  onChangeRating(newRating: number) {
    this.setState({ ratingStar: newRating });
  }

  showModal = () => {
      const modalEle = this.modalRef.current;
      const bsModal = new Modal(modalEle, {
          backdrop: 'static',
          keyboard: false
      })
      bsModal.show()
  }
  
  hideModal = () => {
      const modalEle = this.modalRef.current;
      const bsModal= Modal.getInstance(modalEle)
      bsModal?.hide()
  }

  getFilms = (search = 'a') => {
    if(!search) { search = 'a'; } 
    httpClient.get(`movie?api_key=8f781d70654b5a6f2fa69770d1d115a3&query=${search}`)
      .then((response) => {
        this.setState({ original_films: response.data.results });
      }).catch((error) =>{
        console.error(error)
      })
  }
  setFilm = (film: any) => {
    this.setState({ film: film });
  }
  

  componentDidMount() {
    this.getFilms(this.props.search);
  }
  componentDidUpdate(prevProps: any) {
    if(!equal(this.props.search, prevProps.search)) {
      this.getFilms(this.props.search);
    }
  }

  handleSubmit(event: any) {
    event.preventDefault();
    console.log(this.state);
    const film: IFilm = {
      title: this.state.film.original_title,
      rating: this.state.ratingStar,
      description: this.state.description
    }
  }

  onChange = (e: any) => {
    this.setState({ description: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="row mb-5">
          {this.state.original_films.map((_film: any) => {
            return <div className="col-3 pt-3">
              <div className="card">
                <span className="badge bg-primary custom-badge-2"><FontAwesomeIcon icon={faStar} /> {_film.vote_average}</span>
                { _film.poster_path && <img src={'https://image.tmdb.org/t/p/original' + _film.poster_path} className="card-img-top" alt="" /> }
                { !_film.poster_path && <img src="https://via.placeholder.com/2000x3000?text=Image+not+found" className="card-img-top" alt="" /> }
                <div className="card-body">
                  <h5 className="card-title force-one-line">{_film.original_title}</h5>
                  <p className="card-text">{_film.overview}</p>
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#filmsModalFullscreen" onClick={(e) => this.setFilm(_film)}>View details</button>
                </div>
                <div className="card-footer text-muted">
                  Release in {_film.release_date}
                </div>
              </div>
            </div>;
          })}
        </div>

        <div className="modal fade" id="filmsModalFullscreen" tabIndex={-1} aria-labelledby="filmsModalFullscreenLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="filmsModalFullscreenLabel">
                  <FontAwesomeIcon icon={faFilm} />
                  <span className="ps-2 pe-4">{this.state.film?.original_title}</span>
                  <span className="badge bg-primary align-text-top custom-badge"><FontAwesomeIcon icon={faStar} /> {this.state.film?.vote_average}</span> 
                  <small className="ps-2 fs-6 text-muted align-text-top custom-rated">Rated by: <FontAwesomeIcon icon={faUser} /> {this.state.film?.vote_count}</small>
                  </h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-5">
                    { this.state.film?.poster_path && <img src={'https://image.tmdb.org/t/p/original' + this.state.film?.poster_path} className="img-fluid" alt="" /> }
                    { !this.state.film?.poster_path && <img src="https://via.placeholder.com/2000x3000?text=Image+not+found" className="img-fluid" alt="" /> }
                  </div>
                  <div className="col-7">
                    <p>Sinopsis:</p>
                    <p>{this.state.film?.overview}</p>
                    <div className="card-footer text-muted">
                      Release in {this.state.film?.release_date}
                    </div>
                    <p className="mt-5 mb-0">Rating:</p>
                    <ReactStars count={5} onChange={(newRating) => this.onChangeRating(newRating)} size={40} color2={'#ffd700'} value={this.state.ratingStar} />
                    <form onSubmit={this.handleSubmit.bind(this)}>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label mt-2">Comments:</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={6} onChange={this.onChange}></textarea>
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary float-end mt-2">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: { original_films: any }) => ({
  films: state.original_films,
})

export default connect(mapStateToProps, null)(Films)