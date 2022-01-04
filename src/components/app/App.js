import AppHeader from "../appHeader/AppHeader";

import MainPage from "../pages/MainPage";
import ComicsPage from '../pages/ComicsPage'
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page404 from '../pages/404'
import SingleComicPage from "../pages/SingleComicPage";
const App = () => {


    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                   <Routes>
                        <Route element={<ComicsPage/>} path="comics"/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>} />
                        <Route element={<MainPage/>} index/>
                        <Route element={<Page404/>} path="*"/>
                   </Routes>
                </main>
            </div>
        </Router>
    )
       
}

export default App;

