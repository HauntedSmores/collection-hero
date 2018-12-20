import React, { Component } from 'react'
import Grid from './components/Grid'
import Filters from './components/Filters'
import Pagination from './components/Pagination'
import axios from 'axios'

class App extends Component {

    state = {
        products: [],
        count: 0,
        per_page: 12,
        loading: true
    }

    constructor(props) {
        super(props)
        this.fetchProducts = this.fetchProducts.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/products?limit=${this.state.per_page}`).then(res => {
            console.log(res.data)
            this.setState(res.data)
            this.setState({loading: false})
        })
    }

    fetchProducts(page) {
        this.setState({loading: true})
        console.log(page);

        if (page) {
            axios.get(`/api/products?page=${page}&limit=${this.state.per_page}`).then(res => {
                console.log(res);
                this.setState(res.data)
                this.setState({loading: false})
            })
        } else {
            axios.get('/api/products').then(res => {
                console.log(res.data)
                this.setState(res.data)
                this.setState({loading: false})
            })
        }
    }

    render() {
        return (
            <div>
                <h1 className="mb-2">Collection Title</h1>

                <div className="flex">
                    <Filters/>
                    <div className="w-full">
                        { this.state.loading ? <p>Loading...</p> : (
                            <>
                                <Grid title="Products" items={ this.state.products } />
                                <Pagination count={this.state.count} perPage={this.state.per_page} getPage={this.fetchProducts}/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
