import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(
        async (
            url, 
            method = 'GET', 
            body = null, 
            headers = {'Content-type': 'application/json'}
            ) => {
                setLoading(true)

                try {
                    const res = await fetch(url, {method, body, headers})

                    if(!res.ok){
                        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
                    }
                    const data = await res.json()

                    setLoading(false)

                    return data
                } catch (err) {
                    setLoading(false)
                    setError(err.message)
                    throw err
                }
    },[])

    const clearError = useCallback(()=> setError(null), null)

    return {loading, error, clearError, request}
}