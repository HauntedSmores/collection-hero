import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FilterList from './FilterList/FilterList'
import styles from './Dashboard.module.css'
import axios from 'axios'
import { update_config } from '../../store/actions'

class Dashboard extends Component {

    state = {
        loading: true,
        syncing: false,
        saving: false,
        filter_options: [],
        selected_filters: []
    }

    componentDidMount() {

       axios.get('/api/mapping').then(res => {
            console.log(res)

            let options = Object.keys(res.data.product.properties);
            options.splice(options.indexOf('options'), 1);
            this.setState({
                filter_options: [...options, 'option 1', 'option 2', 'option 3'],
                selected_filters: this.props.user_config.filters,
                loading: false
            })

        })
        
    }

    sync = () => {
        this.setState({syncing: true})
        axios.get('/api/sync').then(res => {
            console.log(res)
            this.setState({syncing: false})
        })
    }

    selectFilter = (filter, $event) => {
        console.log($event.target.checked)

        let filters = [...this.state.selected_filters]
        let exists = filters.includes(filter)

        console.log(filters, exists)
        if ($event.target.checked && !exists) {
            console.log('Checked and does not exist yet')
            this.setState({selected_filters: [filter, ...filters]})
        } else if (exists) {
            console.log('Unchecked and exist already')
            let index = filters.indexOf(filter)
            filters.splice(index,1)
            this.setState({selected_filters: filters})
        }
    }

    selectAll = () => {
        this.setState({selected_filters: this.state.filter_options})
    }
    
    clearAll = () => {
        this.setState({selected_filters: []})
    }

    save = () => {
        this.setState({saving: true})
        axios.post('/api/user-config', {config: {filters: this.state.selected_filters}}).then(res => {
            console.log(res)
            this.setState({saving: false})
            this.props.dispatch(update_config({filters: this.state.selected_filters}))
        })
    }

    render() {

        return (
            <div className={styles.dashboard}>
                <Link className='inline-block mr-2' to="/collections/men">Preview Collection</Link>
                <h2 className="mb-2">Dashboard</h2>
                <p className="mb-2">Sync products from Shopify to ElasticSearch</p>
                <button className="btn mb-4" onClick={this.sync}>
                    {this.state.syncing ? 'Working...' : 'Sync'}
                </button>
                <FilterList
                    filters={this.state.filter_options}
                    selectedFilters={this.state.selected_filters}
                    onSelect={this.selectFilter.bind(this)}
                    selectAll={this.selectAll}
                    clearAll={this.clearAll}
                />
                <button className="btn" onClick={this.save} >{this.state.saving ? 'Saving...' : 'Save'}</button>
            </div>
        )
    }
}

function mapState(state) {
    return { user_config: state.config }
}

export default withRouter(connect(mapState)(Dashboard))