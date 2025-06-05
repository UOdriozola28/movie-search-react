// import withoutResults from './mocks/non-results.json'
import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies({ search, sort }) {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [_, setError] = useState(null)
    const previousSearch = useRef(search);


    // hecho para funciones useCallback
    const getMovies = useCallback(async ({ search }) => {

        if (previousSearch.current === search) return

        try {
            setLoading(true)
            setError(null)
            previousSearch.current = search

            const newMovies = await searchMovies({ search })
            setMovies(newMovies)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }

    }, [])

    // hecho para memorizar useMemo
    const sortedMovies = useMemo(() => {
        return sort
            ? (movies ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : []) : movies
    }, [sort, movies])

    return { movies: sortedMovies, getMovies, loading }
}