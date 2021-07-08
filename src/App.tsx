import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import  Films from './pages/Films'
import List from './pages/List'
import './App.scss';


function App() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "rgb(3, 37, 65)"}}>
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src='/films.svg' height="20" className="d-inline-block align-top" alt="" style={{marginTop: "0.35rem"}} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarFilm" aria-controls="navbarFilm" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarFilm">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/list">My list</a>
              </li>
            </ul>
          </div>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={event => setSearch(event.target.value)} />
            {/* <button className="btn btn-outline-light" type="submit">Search</button> */}
          </form>
        </div>
      </nav>
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Films search={search} />
            </Route>
            <Route exact path='/list' component={List}/>
            <Route exact path='*' >
              <div>
                404 Page Not Found
              </div>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
