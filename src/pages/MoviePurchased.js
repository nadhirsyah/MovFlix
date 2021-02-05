import React from 'react'

class MoviePurchased extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      purchased: JSON.parse(localStorage.getItem('movie')),
    }
  }
  render() {
    return (
      <div data-test="movie-purchased" className="container">
        <table class="table">
          <thead>
            <tr>
              <th className="roboto" scope="col">
                Nama Film
              </th>
              <th className="roboto" scope="col">
                Harga
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.purchased.map((movie) => (
              <tr>
                <td className="roboto">{movie.name}</td>
                <td className="roboto">{movie.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
export default MoviePurchased
