import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from 'react'
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService()

    onCharLoaded = (char) => {
        this.setState({char})
        this.setState({loading: false})
    }

    onError = (err) => {
        this.setState( {
            error: true,
            loading:false
        })
    }

    updateChar = () => {
        this.setState({loading: true})
        //примерный диапазон персонажей
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    componentDidMount(){
        this.updateChar()
    }

    formatDescription = (description) => {
        if(!description)
            return 'There is no description'
        else if (description.length > 200)
            return description.slice(0,200) + '...'
        return description
        
    }

    render(){
        const {loading, char, error} = this.state
       
        const {updateChar, formatDescription} = this
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View formatDescription={formatDescription} char={char}/> : null

        return (
            <div className="randomchar">
                {errorMessage || spinner}
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
}

const View = ({char,formatDescription}) => {
    const {thumbnail, name, homepage, wiki, description} = char
    return (
        <div className="randomchar__block">
            <img src={thumbnail} style={thumbnail.indexOf('not_available') > -1 ? {objectFit: 'contain'} : {}} alt="Random character" className="randomchar__img"/>
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