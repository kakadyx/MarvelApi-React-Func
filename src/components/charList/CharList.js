import './charList.scss';
import {Component} from 'react'
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

class CharList extends Component {
    
    state = {
        charList: [],
        loading: true,
        newCharsLoading: false,
        error: false,
        offset: 0,
        charEnded: false,
    }

    marvelService = new MarvelService()

    onCharsLoaded = (newCharList) => {
        this.setState(({charList}) => ({charList: [...charList, ...newCharList]}))
        this.setState({
            loading: false,
            newCharsLoading: false
        })
        if(newCharList.length < 9)
            this.setState({charEnded: true})
    }

    getNewChars = () => {
        this.onCharsLoading()
        this.setState({offset: this.state.offset + 9})
        this.marvelService.getAllCharacters(9, this.state.offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharsLoading = () => {
        this.setState({
            newCharsLoading: true,
        })
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
        const {charList, loading, error, newCharsLoading, charEnded} = this.state
        const {onCharSelected} = this.props
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View charId={this.props.charId} onCharSelected={onCharSelected} charList={charList}/> : null
        const buttonBlock = !newCharsLoading || loading ? 
        (   <button style={{display: charEnded ? 'none' : ''}} onClick={this.getNewChars} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>) : <Spinner />
        
            
        return (
            <div className="char__list">
                {spinner || errorMessage}
                {content}
                {buttonBlock}
            </div>
        )
    }
    
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