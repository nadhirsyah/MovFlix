import React from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'
import Paginate from '../components/Paginate'
import { Link } from 'react-router-dom'
import '../App.css'

class MoviesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      movies: [],
    }
    this.checkPurchased = this.checkPurchased.bind(this)
  }

  componentDidMount() {
    // localStorage.clear()
    if (
      parseInt(localStorage.getItem('budget')) === 0 ||
      !localStorage.getItem('budget')
    ) {
      localStorage.setItem('budget', 100000)
    }
    // if (!localStorage.getItem('movie')) {
    //   console.log(localStorage.getItem('movie'))
    // }
    // console.log(localStorage.getItem('budget'))
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing', {
        params: {
          api_key: '9610ac956926261edceb5904e2ec6d17',
          region: 'ID',
          page: this.props.match.params.page,
        },
      })
      .then((res) => {
        const results = res.data
        this.setState({ results })
        const movies = results.results
        this.setState({ movies })
      })
  }
  checkPurchased(id) {
    var arrayMoviePurchased = JSON.parse(localStorage.getItem('movie'))
    var purchased = false
    if (arrayMoviePurchased) {
      arrayMoviePurchased.forEach((element) => {
        if (element.id === id) purchased = true
      })
    }
    return purchased
  }

  render() {
    const cardStyle = {
      color: 'black',
      textDecoration: 'none',
    }

    return (
      <div>
        <div data-test="movies-list" className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4 pt-3">
            {this.state.movies.map((movie) => (
              <div className="col" key={movie.id}>
                <Link
                  style={cardStyle}
                  to={`/${movie.id}-${movie.original_title.replace(/\s/g, '-')}`}
                >
                  <MovieCard movie={movie} purchased={this.checkPurchased(movie.id)} />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <Paginate
              active={this.props.match.params.page}
              page={this.state.results.page}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default MoviesList
