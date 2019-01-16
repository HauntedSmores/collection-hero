import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from './Grid'
import Filters from './Filters'
import Pagination from './Pagination'
import axios from 'axios'
import { http } from '../utils'
import { throws } from 'assert';

class Collection extends Component {

    state = {
        products: [],
        filters: [],
        count: 0,
        per_page: 6,
        active_page: 1,
        loading: true
    }

    fetchProducts = this.fetchProducts.bind(this)

    componentDidMount() {
        this.fetchProducts(1)
    }

    fetchProducts(page) {
        this.setState({active_page: page, loading: true})
        let handle = this.props.match.params.handle
        if (page) {
            axios.get(`/api/collections/${handle}?page=${page}&limit=${this.state.per_page}`).then(res => {
                console.log(res)
                let products = res.data.hits.map(hit => hit._source)
                this.setState({count: res.data.total, products, loading: false})
            })
        }
    }

    render() {
        return (
            <div>
                <Link to="/">Dashboard</Link>
                <h2 className="mb-2">Collection Title</h2>

                <div className="flex">
                    <Filters filters={this.props.config.filters}/>
                    <div className="w-full">
                        { this.state.loading ? <p>Loading...</p> : (
                            <>
                                <Grid title="Products" items={ this.state.products } />
                                <Pagination
                                    count={this.state.count}
                                    perPage={this.state.per_page}
                                    getPage={this.fetchProducts}
                                    activePage={this.state.active_page}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return { config: state.config }
}
export default withRouter(connect(mapState)(Collection))
// export default Collection
