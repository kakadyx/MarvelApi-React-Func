import './charList.scss';
import {Component} from 'react'
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    
    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService()

    onCharsLoaded = (charList) => {
        this.setState({charList})
        this.setState({loading: false})
    }

    getNewChars = () => {
        this.setState({loading: true})
        this.marvelService.getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    componentDidMount(){
        this.getNewChars()
    }

    onError = (err) => {
        this.setState( {
            error: true,
            loading:false
        })
    }

    render(){
        const {charList, loading, error} = this.state
        const {onCharSelected} = this.props
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View onCharSelected={onCharSelected} charList={charList}/> : null
        return (
            <div className="char__list">
                {spinner || errorMessage}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

const View = ({charList,onCharSelected}) => {
    let renderList = []

    if(charList.length)
        charList.forEach(item => renderList.push(
           ( 
            <li className="char__item" key={item.id} onClick={() => onCharSelected(item.id)}>
                <img style={item.thumbnail.indexOf('not_available') > -1 ? {objectFit: 'fill'} : {}}  src={item.thumbnail} alt="char_img"/>
                <div className="char__name">{item.name}</div>
            </li>
            )
        ))
    return (<ul className="char__grid">{renderList}</ul>)     
}


export default CharList;