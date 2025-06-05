// import { useRef } from 'react'
import { useMemo, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovie'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {

  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useMemo(() => {
    return debounce(search => {
      getMovies({ search })
    }, 300)
  }, [getMovies])

  // * Nos se deberia de abusar del ref
  // const inputRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    // const value = inputRef.current.value
    // const { query } = Object.fromEntries(new FormData(e.target))
    // const value = fields.get('query')
    getMovies({ search })
  }

  const handleChange = (e) => {

    const newSearch = e.target.value

    if (newSearch.startsWith(' ')) return
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }


  return (
    <div className='page'>
      <header>
        <h1>Buscador de pelicula</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }} onChange={handleChange} name='search' type="text" placeholder='Avengers, Starts Wars, The Matrix...' value={search} />
          <label htmlFor="">
            <span>
              Ordenar alfabéticamente
            </span>
            <input type='checkbox' onChange={handleSort} checked={sort} />
          </label>

          <button>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div >
  )

}

export default App
