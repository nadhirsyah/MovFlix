import React from 'react'
import axios from 'axios'

class MoviesDetail extends React.Component {
  state = {
    movie: [],
    id: this.props.match.params.id,
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
    return <div></div>
  }
}
export default MoviesDetail
