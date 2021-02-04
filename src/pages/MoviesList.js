import React from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'
import Paginate from '../components/Paginate'

class MoviesList extends React.Component {
  state = {
    results: [],
    movies: [],
    page: this.props.match.params.page,
  }

  componentDidMount() {
    console.log(this.state.page)
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing', {
        params: {
          api_key: '9610ac956926261edceb5904e2ec6d17',
          region: 'ID',
          page: this.state.page,
        },
      })
      .then((res) => {
        const results = res.data
        this.setState({ results })
        const movies = results.results
        this.setState({ movies })
      })
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4 pt-3">
            {this.state.movies.map((movie) => (
              <div className="col" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
          <div>
            {console.log(this.state.results)}
            <Paginate active={this.state.page} page={this.state.results.page} />
          </div>
        </div>
      </div>
    )
  }
}
export default MoviesList
