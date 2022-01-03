import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react/cjs/react.development';

const ComicsList = () => {
    const {loading, error, getAllComics} = useMarvelService()
    const [offset, setOffset] = useState(0)
    const [comics, setComics] = useState([])
    const [comicsEnded, setComicsEnded] = useState(false)
    useEffect(()=>{
        getNewComics()
    },[])

    const getNewComics = () => {
        setOffset(offset + 8)
        getAllComics(8, offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComicsList) => {
        setComics(comicsList => [...comicsList, ...newComicsList])
        if(newComicsList.length < 8){
            setComicsEnded(true)
        }
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const buttonBlock = !loading ? 
    (   <button style={{display: comicsEnded ? 'none' : ''}} onClick={getNewComics} className="button button__main button__long">
            <div className="inner">load more</div>
        </button>) : <Spinner />

    return (
        <div className="comics__list">
            {errorMessage}
            <View comics={comics}/>
            {buttonBlock}
        </div>
    )
}

const View = ({comics}) => {
    let renderList = []
    if(comics.length)
        comics.forEach((comic, i) => {
            renderList.push(
                <li key={i} className="comics__item">
                <a href="#">
                    <img src={comic.thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{comic.title}</div>
                    <div className="comics__item-price">{comic.price || 'not available'}</div>
                </a>
                </li>  
            )
            
        })
    
    return ( <ul className="comics__grid">{renderList}</ul>)
    
}

export default ComicsList;