import noImage from './../assets/images/no-image.png'

function ListOfMovies({ movies }) {
    return (
        <ul className="movies">
            {
                movies.map(movie => {
                    return (
                        <li className="movie" key={movie.id} >
                            <h3>{movie.title}</h3>
                            <p>{movie.year}</p>
                            <img
                                src={movie.image}
                                onError={(e) => {
                                    e.target.src = noImage
                                }}
                                alt={movie.title}
                            />
                        </li>
                    )
                })
            }
        </ul >
    )
}

function NoMoviesResults() {
    return (
        <p>No se encontraron películas para esta búsqueda</p>
    )
}

export function Movies({ movies }) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies
            ? <ListOfMovies movies={movies} />
            : <NoMoviesResults />
    )
}
