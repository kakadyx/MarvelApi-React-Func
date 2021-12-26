
class MarvelService{
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=13c458da1fe1c6eca693d2975ee578cd'
    _baseOffsetChars = 210

    getResource = async (url) => {
        let res = await fetch(url)

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, error ${res.status}`)
        }

        return await res.json()
    }

    getAllCharacters= async (limit = 9, offset = 0) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=${limit}&offset=${this._baseOffsetChars + offset}&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        const char = res.data.results[0]
        return this._transformCharacter(char)
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService
