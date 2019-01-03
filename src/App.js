import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
import Collection from './components/Collection'
import Dashboard from './components/Dashboard'
import axios from 'axios'

class App extends Component {

    render() {
        return (
            <>
                <h1 className="mb-2">Collection Hero</h1>
                <Link to="/">Dashboard</Link>
                <Link to="/collection">Collection</Link>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/collection' component={Collection}/>
            </>
        )
    }
}

export default App;
