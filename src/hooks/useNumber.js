import { useEffect, useRef, useState } from "react"

export function useNumber() {

    const [error, setError] = useState(null)
    const [number, setNumber] = useState('')
    const isFirstInput = useRef(true)

    useEffect(() => {

        if (isFirstInput.current) {
            isFirstInput.current = false
            return
        }

        if (number === '') {
            setError('No se puede operar sin número')
            return
        }

        if (!/^\d+$/.test(number)) {
            setError('No se puede operar con letras')
            return
        }

        setError(null)
    }, [number])

    return { number, setNumber, error, setError, isFirstInput }
}
