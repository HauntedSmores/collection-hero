import React, { Component } from 'react'
import FilterList from './FilterList/FilterList'
import styles from './Dashboard.module.css'
import axios from 'axios'

class Dashboard extends Component {

    state = {
        loading: true,
        syncing: false,
        saving: false,
        filter_options: [],
        selected_filters: []
    }

    componentDidMount() {
        let fetch_array = [
            axios.get('/api/mapping'),
            axios.get('/api/user-config')
        ]

        Promise.all(fetch_array).then(res => {
            console.log(res)

            let options = Object.keys(res[0].data.product.properties);
            options.splice(options.indexOf('options'), 1);
            this.setState({
                filter_options: [...options, 'option 1', 'option 2', 'option 3'],
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

    propTest = (filter, $event) => {
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

    save = () => {
        // this.setState({saving: true})
        // axios.post('/api/user-config', {config: {filters: this.state.chips}}).then(res => {
        //     console.log(res)
        //     this.setState({saving: false})
        // })
    }

    setChips = chips => this.setState({chips})


    render() {

        return (
            <div className={styles.dashboard}>
                <Link className='inline-block mr-2' to="/">Dashboard</Link>
                <h2 className="mb-2">Dashboard</h2>
                <p className="mb-2">Sync products from Shopify to ElasticSearch</p>
                <button className="btn mb-4" onClick={this.sync}>
                    {this.state.syncing ? 'Working...' : 'Sync'}
                </button>
                <FilterList filters={this.state.filter_options} onSelect={this.propTest.bind(this)}/>
                <button className="btn" onClick={this.save} >{this.state.saving ? 'Saving...' : 'Save'}</button>
            </div>
        )
    }
}

export default Dashboard;
