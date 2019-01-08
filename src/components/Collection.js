import React, { Component } from 'react'
import Grid from './Grid'
import Filters from './Filters'
import Pagination from './Pagination'
import axios from 'axios'

class Collection extends Component {

    state = {
        products: [],
        filters: [],
        count: 0,
        per_page: 6,
        active_page: 1,
        loading: true
    }

    fetchProducts = this.fetchProducts.bind(this);

    componentDidMount() {
        axios.get(`/api/products?limit=${this.state.per_page}`).then(res => {
            this.setState(res.data)
            this.setState({loading: false})
        })

        axios.get('/api/user-config').then(res => {
            console.log(res)
            this.setState({filters: res.data.config})
        })
    }

    fetchProducts(page) {
        this.setState({active_page: page, loading: true})
        
        if (page) {
            axios.get(`/api/products?page=${page}&limit=${this.state.per_page}`).then(res => {
                this.setState(res.data)
                this.setState({loading: false})
            })
        } else {
            axios.get('/api/products').then(res => {
                this.setState(res.data)
                this.setState({loading: false})
            })
        }
    }

    render() {
        return (
            <div>
                <h2 className="mb-2">Collection Title</h2>

                <div className="flex">
                    <Filters/>
                    <div className="w-full">
                        { this.state.loading ? <p>Loading...</p> : (
                            <>
                                <Grid title="Products" items={ this.state.products } />
                                <Pagination
                                    count={this.state.count}
                                    perPage={this.state.per_page}
                                    getPage={this.fetchProducts}
                                    activePage={this.state.active_page}/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Collection;
