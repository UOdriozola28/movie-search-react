import { useEffect, useRef, useState } from "react"

export function useSearch() {
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)

    useEffect(() => {

        if (isFirstInput.current) {
            isFirstInput.current = search === ''
            return
        }

        if (search === '') {
            setError('No se puede buscar una pelicula vacia')
            return
        }

        if (search.match(/^\d+$/)) {
            setError('No se puede buscar una pelicula con número')
            return
        }

        if (search.length < 3) {
            setError('La búsqueda debe tener 3 caracteres')
            return
        }

        setError(null)
    }, [search])

    return { search, setSearch, error }
}