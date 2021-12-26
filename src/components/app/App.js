import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import {Component} from 'react'
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

class App extends Component {

    state = {
        selectedChar: null
    }
    
    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render(){ 
        const {onCharSelected} = this
        const {selectedChar} = this.state
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary><RandomChar/></ErrorBoundary>
                    
                    <div className="char__content">
                        <ErrorBoundary><CharList onCharSelected={onCharSelected}/></ErrorBoundary>
                        
                        <ErrorBoundary><CharInfo charId={selectedChar}/></ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
       
    }
}

export default App;