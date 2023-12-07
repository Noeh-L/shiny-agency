import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context/context'

// Fetching des data________________________
export function useFetch(url) {
    const [data, setData] = useState({})

    const [isLoading, setLoading] = useState(true)

    const [error, setError] = useState(false)

    useEffect(() => {
        if (!url) return

        setLoading(true)

        async function fetchData() {
            try {
                const response = await fetch(
                    `https://shiny-agency-api.onrender.com${url}`,
                )
                const data = await response.json()
                setData(data)
            } catch (err) {
                console.log('==== erreur ====', err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { isLoading, data, error }
}

// Theme dark ou white________________
export function useTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const setTheme = toggleTheme

    return { theme, setTheme }
}
