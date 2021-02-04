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
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nama Film</th>
              <th scope="col">Harga</th>
            </tr>
          </thead>
          <tbody>
            {this.state.purchased.map((movie) => (
              <tr>
                <td>{movie.name}</td>
                <td>{movie.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
export default MoviePurchased
