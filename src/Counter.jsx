import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useNumber } from './hooks/useNumber'

function Counter() {

    const [total, setTotal] = useState(0)
    const { number, setNumber, error, setError, isFirstInput } = useNumber()
    const totalRef = useRef(null)

    useEffect(() => {
        const el = totalRef.current
        if (!el) return

        el.classList.add('animate')

        const timeout = setTimeout(() => {
            el.classList.remove('animate')
        }, 300)

        return () => clearTimeout(timeout)
    }, [total])



    const handleChange = (e) => {
        const newNumber = e.target.value
        setNumber(newNumber)
    }

    const handleSum = () => {

        if (error || (number === '')) return

        const newNumber = total + parseInt(number)
        setTotal(newNumber)
    }

    const handleSubtraction = () => {

        if (error || (number === '')) return

        const newNumber = total - parseInt(number)
        setTotal(newNumber)
    }

    const handleReboot = () => {
        setTotal(0)
        setError(null)
        setNumber('')
        isFirstInput.current = true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='page'>
            <header>
                <h1>Contador Inteligente</h1>
                <form className='form' onSubmit={handleSubmit}>

                    <label htmlFor="number">
                        <span htmlFor="number" className='label'>Número para la operación</span>
                        <input onChange={handleChange} id='number' name='number' value={number} placeholder='5' />
                    </label>

                    {
                        error && <p style={{ color: 'red' }} >{error}</p>
                    }

                    <div className='buttons'>
                        <button onClick={handleSum}>+</button>
                        <button onClick={handleSubtraction}>-</button>
                        <button onClick={handleReboot} >Reiniciar</button>
                    </div>

                </form>
            </header>
            <main>
                <div className='operation'>
                    {/* <span className=''>
                        {total}
                    </span> */}
                    <span ref={totalRef}>
                        {total}
                    </span>

                </div>
            </main>
        </div >
    )
}

export default Counter