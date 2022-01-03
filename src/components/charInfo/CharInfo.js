import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
const CharInfo = (props) => {
    const [char, setChar] = useState(null)
    

    const {loading,error, getCharacter} = useMarvelService()


    useEffect(()=> {
        updateChar()
    }, [])

    useEffect(()=>{
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props
        if(!charId)
            return

        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }


        const skeleton = char || loading || error ? null : <Skeleton/> 
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) && char ? <View char={char}/> : null

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage || spinner}
                {content}
            </div>
        )
    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    return (
        <>
        <div className="char__basics">
            <img style={char.thumbnail.indexOf('not_available') > -1 ? {objectFit: 'fill'} : {}} src={thumbnail} alt="char_img" />
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div><div className="char__descr">
                {description}
            </div><div className="char__comics">Comics:</div><ul className="char__comics-list">
            {   
                comics.length ? 
                comics.slice(0,10).map((comics,i) => {
                    return (
                        <li className="char__comics-item" key={i}>
                            {comics.name}
                        </li>
                    )
                }) :
                "There is no comics available"
            }
                
            </ul>
            </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;