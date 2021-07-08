import React from 'react'
import httpClient from '../services/axios-client'


export default class List extends React.Component {

  getPlanet = (planetId = '') => {
    httpClient.get(`movie?api_key=8f781d70654b5a6f2fa69770d1d115a3&query=bruce+willis`)
      .then((response) => {
        console.log(response.data.results);
      }).catch((error) =>{
        console.error(error)
      })
  }

  componentDidMount() {
    this.getPlanet();
  }

  render() {
    return (
        <div className="App">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores est cumque totam, ipsam quisquam asperiores cupiditate harum perferendis exercitationem fugiat a! Explicabo commodi atque odit veniam nisi sit debitis dolore.</p>
        </div>
    )
  }
}


