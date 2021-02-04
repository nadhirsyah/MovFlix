import React from 'react'

function MovieCard(props) {
  const image_api = 'https://image.tmdb.org/t/p/w300/'
  return (
    <div className="card mx-auto h-100" style={{ maxWidth: '22rem' }}>
      <img
        src={image_api + props.movie.poster_path}
        className="card-img-top"
        alt={props.movie.title}
      />
      <div className="card-body">
        <h5 className="card-title">{props.movie.title}</h5>
        <p className="card-text">Rp.{getPrice(props.movie.vote_average)}</p>
      </div>
    </div>
  )
}

function getPrice(rating) {
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
export default MovieCard
