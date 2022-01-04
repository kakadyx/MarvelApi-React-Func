import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
const SingleComic = () => {
    const {comicId} = useParams()
    const [comic, setComic] = useState(null)
    const {loading, error, getComic} = useMarvelService()

    useEffect(()=> {
        updateComic()
    }, [])

    const updateComic = () => {
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        console.log('kek')
        setComic(comic)
        console.log(comic)
    }

    const content = !(loading || error) && comic ? 
        <div className="single-comic">
            <img src={comic.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comic.title}</h2>
                <p className="single-comic__descr">{comic.description}</p>
                <p className="single-comic__descr">{comic.pages || 'unknown number of'} pages</p>
                <div className="single-comic__price">{comic.price || 'Not available'}</div>
            </div>
            <Link to="../comics" className="single-comic__back">Back to all</Link>
        </div> : <Spinner></Spinner>

    return (
        <>
            {content}
        </>
        
    )
}

export default SingleComic;