import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useState, useEffect } from 'react';
const RandomChar = (props) => {
    const [char, setChar] = useState({})

    const {loading, error, getCharacter, clearError} = useMarvelService()

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id)
            .then(onCharLoaded)
    }

    useEffect(()=> {
        updateChar()
    }, [])

    const formatDescription = (description) => {
        if(!description)
            return 'There is no description'
        else if (description.length > 200)
            return description.slice(0,200) + '...'
        return description
    }

 
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error || !char) ? <View formatDescription={formatDescription} char={char}/> : null

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )

}

const View = ({char,formatDescription}) => {
    const {thumbnail, name, homepage, wiki, description} = char
    console.log(thumbnail)
    let styleImg = {}
    if(thumbnail)
        styleImg = thumbnail.indexOf('not_available') > -1 ? {objectFit:'contain'} : {}
    return (
        <div className="randomchar__block">
            <img src={thumbnail} style={styleImg}  alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {formatDescription(description)}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;