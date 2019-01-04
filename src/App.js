import React, { Component } from 'react'
import { Route, Link } from "react-router-dom";
import Collection from './components/Collection'
import Dashboard from './components/Dashboard'

import './App.css'

class App extends Component {

    render() {
        return (
            <>
                <h1 className="mb-2">Collection Hero</h1>
                <div class="mb-4">
                    <Link className='inline-block mr-2' to="/">Dashboard</Link>
                    <Link to="/collection">Collection</Link>
                </div>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/collection' component={Collection}/>
            </>
        )
    }
}

export default App;
