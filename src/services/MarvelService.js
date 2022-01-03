
import { useHttp } from '../hooks/http.hook'
 const useMarvelService = () =>  {

    const  {loading, error, request, clearError} = useHttp()
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=13c458da1fe1c6eca693d2975ee578cd'
    const _baseOffsetChars = 210

    const getAllCharacters= async (limit = 9, offset = 0) => {
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${_baseOffsetChars + offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }
    
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        const char = res.data.results[0]
        return _transformCharacter(char)
    }

    const getAllComics = async (limit = 8, offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description,
            price: comics.prices.price,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
        }
    }

    const _transformCharacter = (char) => {
        
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage:  char.urls[0].url,
            wiki:   char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics}
}

export default useMarvelService