import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Main from '../../pages/main';
import Pumping from '../../pages/pumping';
import Pumped from '../../pages/pumped';

import './app.css';

const App = () => {
    const { REACT_APP_DEPLOY_FOLDER } = process.env;
    
    return (
        <div className="App" >
            <Router basename={REACT_APP_DEPLOY_FOLDER}>
                <Route path={`/`} component={ Main } exact/>

                <Route path={`/pumping`} component={ Pumping }/>

                <Route path={`/pumped`} component={ Pumped }/>
            </Router>
        </div>
    )
}

export default App;