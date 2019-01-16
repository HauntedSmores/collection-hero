import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from "react-router-dom";
import Collection from './Collection'
import Dashboard from './Dashboard'
import { http } from '../utils'
import { update_config } from '../store/actions'

import './App.css'

class App extends Component {

    state = { loading: true }

    componentDidMount() {
        http.get('/user-config').then(res =>  {
            console.log(update_config(res.data.config))
            this.props.dispatch(update_config(res.data.config))
            this.setState({loading: false})
        })
    }

    render() {
        return (
            <>
                <h1 className="mb-2">Collection Hero</h1>
                { this.state.loading ? null : (
                    <>
                        <Route exact path='/' component={Dashboard}/>
                        <Route path='/collections/:handle' component={Collection}/>
                    </>
                )}
            </>
        )
    }
}

export default connect()(App)
