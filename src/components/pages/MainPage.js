
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import { useState } from "react";

const MainPage = (props) => {
    const [selectedChar, setSelectedChar] = useState(null)

    
    const onCharSelected = (id) => {
        setSelectedChar(id)
    }

    return (
        <><ErrorBoundary><RandomChar /></ErrorBoundary><div className="char__content">
            <ErrorBoundary><CharList charId={selectedChar} onCharSelected={onCharSelected} /></ErrorBoundary>

            <ErrorBoundary><CharInfo charId={selectedChar} /></ErrorBoundary>
        </div><img className="bg-decoration" src={decoration} alt="vision" /></>
    )
}

export default MainPage