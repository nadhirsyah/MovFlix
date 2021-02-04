import React from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'
import '../App.css'

class MoviesDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: [],
      casts: [],
      similar: [],
      recommendations: [],
      id: this.props.match.params.id,
    }
    this.getMovieDetail = this.getMovieDetail.bind(this)
    this.getMovieCast = this.getMovieCast.bind(this)
    this.getSimilarMovie = this.getSimilarMovie.bind(this)
    this.getRecommendationsMovie = this.getRecommendationsMovie.bind(this)
    this.getPrice = this.getPrice.bind(this)
    this.buyMovie = this.buyMovie.bind(this)
    this.checkPurchased = this.checkPurchased.bind(this)
  }

  componentDidMount() {
    this.getMovieDetail()
    this.getMovieCast()
    this.getSimilarMovie()
    this.getRecommendationsMovie()
  }
  getMovieDetail() {
    axios
      .get('https://api.themoviedb.org/3/movie/' + this.state.id, {
        params: {
          api_key: '9610ac956926261edceb5904e2ec6d17',
          region: 'ID',
        },
      })
      .then((res) => {
        const movie = res.data
        this.setState({ movie })
      })
  }
  getMovieCast() {
    axios
      .get('https://api.themoviedb.org/3/movie/' + this.state.id + '/credits', {
        params: {
          api_key: '9610ac956926261edceb5904e2ec6d17',
          region: 'ID',
        },
      })
      .then((res) => {
        const casts = res.data.cast
        this.setState({ casts })
      })
  }
  getSimilarMovie() {
    axios
      .get('https://api.themoviedb.org/3/movie/' + this.state.id + '/similar', {
        params: {
          api_key: '9610ac956926261edceb5904e2ec6d17',
          region: 'ID',
          page: 1,
        },
      })
      .then((res) => {
        const similar = res.data.results
        this.setState({ similar })
      })
  }
  getRecommendationsMovie() {
    axios
      .get('https://api.themoviedb.org/3/movie/' + this.state.id + '/recommendations', {
        params: {
          api_key: '9610ac956926261edceb5904e2ec6d17',
          region: 'ID',
          page: 1,
        },
      })
      .then((res) => {
        const recommendations = res.data.results
        this.setState({ recommendations })
      })
  }
  convertArrayToString(arr) {
    return Array.prototype.map
      .call(arr, function (item) {
        return item.name
      })
      .join(', ')
  }
  getPrice(rating) {
    var price = 0
    var intRating = parseInt(rating)
    if (rating >= 1 && intRating < 3) {
      price = 3500
    } else if (intRating >= 3 && intRating < 6) {
      price = 8250
    } else if (intRating >= 6 && intRating < 8) {
      price = 16350
    } else if (intRating >= 8 && intRating < 10) {
      price = 21250
    }
    return price
  }
  buyMovie() {
    var budget = parseInt(localStorage.getItem('budget'))
    var price = parseInt(this.getPrice(this.state.movie.vote_average))
    var subs = budget - price
    console.log(subs)
    if (price <= budget) {
      localStorage.setItem('budget', subs)
      var arrayMoviePurchased = JSON.parse(localStorage.getItem('movie'))
      if (!arrayMoviePurchased) arrayMoviePurchased = []
      var moviePurchased = {
        id: this.state.movie.id,
        name: this.state.movie.original_title,
        price: price,
      }
      arrayMoviePurchased.push(moviePurchased)
      console.log(arrayMoviePurchased)
      localStorage.setItem('movie', JSON.stringify(arrayMoviePurchased))
      window.location.reload()
    }
  }
  checkPurchased() {
    var arrayMoviePurchased = JSON.parse(localStorage.getItem('movie'))
    var purchased = false
    if (arrayMoviePurchased) {
      arrayMoviePurchased.forEach((element) => {
        if (element.id === this.state.movie.id) purchased = true
      })
    }
    return purchased
  }
  render() {
    const image_api = 'https://image.tmdb.org/t/p/w300/'
    return (
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-3">
              {this.checkPurchased() ? (
                <div>
                  <img
                    src={image_api + this.state.movie.poster_path}
                    alt={this.state.movie.original_title}
                    className="card-img-top img-grey"
                  />
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block col-12"
                    disabled
                  >
                    Beli Film
                  </button>
                </div>
              ) : (
                <div>
                  <img
                    src={image_api + this.state.movie.poster_path}
                    alt={this.state.movie.original_title}
                    className="card-img-top"
                  />
                  <button
                    type="button"
                    onClick={this.buyMovie}
                    className="btn btn-primary btn-lg btn-block col-12"
                  >
                    Beli Film
                  </button>
                </div>
              )}
            </div>
            <div className="col-9">
              <h2>{this.state.movie.original_title}</h2>
              {this.state.movie.genres === undefined ? null : (
                <p>Genre Film: {this.convertArrayToString(this.state.movie.genres)}</p>
              )}
              {this.state.casts === undefined ? null : (
                <p>Casts : {this.convertArrayToString(this.state.casts)}</p>
              )}
              <p>Rating : {this.state.movie.vote_average}</p>
              {this.state.movie.vote_average === undefined ? null : (
                <p>Harga : Rp.{this.getPrice(this.state.movie.vote_average)}</p>
              )}
              <h4>Sinopsis</h4>
              <p>{this.state.movie.overview}</p>
            </div>
          </div>
        </div>
        <div className="container mt-4">
          <h2>Film Serupa</h2>
          <div className="row row-cols-1 row-cols-md-6 g-4 pt-3">
            {this.state.similar.map((movie) => (
              <div className="col" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
        <div className="container mt-4">
          <h2>Rekomendasi Film</h2>
          <div className="row row-cols-1 row-cols-md-6 g-4 pt-3">
            {this.state.recommendations.map((movie) => (
              <div className="col" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default MoviesDetail
