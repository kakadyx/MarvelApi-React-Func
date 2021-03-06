import './charList.scss';
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
const CharList = (props) => {
    const [charList, setCharList] = useState([])
    const [offset, setOffset] = useState(0)
    const [charEnded, setCharEnded] = useState(false)
    

    const {loading, error, getAllCharacters} = useMarvelService()

    const onCharsLoaded = (newCharList) => {
        setCharList(charList => [...charList, ...newCharList])
        if(newCharList.length < 9)
           setCharEnded(chEn => true)
    }

    const getNewChars = (initial = false) => {
        setOffset(offset + 9)
        getAllCharacters(9, offset)
            .then(onCharsLoaded)
    }


    useEffect(()=> {
        getNewChars(true)
    }, [])

        const {onCharSelected} = props
        const errorMessage = error ? <ErrorMessage/> : null
        const buttonBlock = !loading ? 
        (   <button style={{display: charEnded ? 'none' : ''}} onClick={getNewChars} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>) : <Spinner />
        
        return (
            <div className="char__list">
                {errorMessage}
                <View charId={props.charId} onCharSelected={onCharSelected} charList={charList}/>
                {buttonBlock}
            </div>
        )
    
}

const View = ({charId, charList,onCharSelected}) => {
    let renderList = []

    if(charList.length)
        charList.forEach((item,i) => renderList.push(
           ( 
            <li className={charId === item.id ? "char__item char__item_selected" : "char__item"} tabIndex={1+i} key={item.id} onClick={() => onCharSelected(item.id)}>
                <img style={item.thumbnail.indexOf('not_available') > -1 ? {objectFit: 'fill'} : {}}  src={item.thumbnail} alt="char_img"/>
                <div className="char__name">{item.name}</div>
            </li>
            )
        ))
    return (<ul className="char__grid">{renderList}</ul>)     
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;