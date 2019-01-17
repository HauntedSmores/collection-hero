import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import FilterList from './FilterList/FilterList'
import styles from './Dashboard.module.css'

class Dashboard extends Component {

    state = {
        loading: false,
        syncing: false,
        saving: false
    }

    sync = () => {
        this.setState({syncing: true})
        axios.get('/api/sync').then(res => {
            console.log(res)
            this.setState({syncing: false})
        })
    }

    render() {

        return this.state.loading ? null : (
            <div className={styles.dashboard}>
                <div className="mb-4">
                    <Link to="/collections/men">Preview Collection</Link>
                </div>
                <h2 className="mb-2">Dashboard</h2>
                <p className="mb-2">Sync products from Shopify to ElasticSearch</p>
                <button className="btn mb-4" onClick={this.sync}>
                    {this.state.syncing ? 'Working...' : 'Sync'}
                </button>
                <FilterList selectedFilters={this.props.user_config.filters} dispatch={this.props.dispatch}/>
            </div>
        )
    }
}

function mapState(state) {
    return { user_config: state.config }
}

export default withRouter(connect(mapState)(Dashboard))