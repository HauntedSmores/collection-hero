import React, { Component } from 'react'
import Grid from './components/Grid'
import Filters from './components/Filters'
import Pagination from './components/Pagination'
import axios from 'axios'

class App extends Component {

    state = {
        products: [],
        count: 0
    }

    componentWillMount() {
        axios.get('/api/products').then(res => {
            console.log(res.data)
            this.setState(res.data)
        })
    }

    render() {
        return (
            <div>
                <h1 className="mb-2">Collection Title</h1>

                <div class="flex">
                    <Filters/>
                    <div className="w-full">
                        <Grid title="Products" items={ this.state.products } />
                        <Pagination count={this.state.count}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
