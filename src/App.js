import React, { Component } from 'react'
import Grid from './components/Grid'
import Filters from './components/Filters'
import axios from 'axios'

class App extends Component {

    state = {
        products: []
    }

    componentWillMount() {
        axios.get('/api/products').then(res => {
            console.log(res.data.products)
            this.setState({products: res.data.products})
        })
    }

    render() {
        return (
            <div>
                <h1 className="mb-2">Collection Title</h1>

                <div class="flex">
                    <Filters/>
                    <Grid title="Products" items={ this.state.products } />
                </div>
            </div>
        )
    }
}

export default App;
