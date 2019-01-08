import React, { Component } from 'react'
import Chips from 'react-chips'
import styles from './Dashboard.module.css'
import axios from 'axios'

class Dashboard extends Component {

    state = {
        loading: true,
        syncing: false,
        saving: false,
        chips: [],
        suggestions: []
    }

    componentDidMount() {
        let fetch_array = [
            axios.get('/api/mapping'),
            axios.get('/api/user-config')
        ]

        Promise.all(fetch_array).then(res => {
            console.log(res)

            let suggs = Object.keys(res[0].data.product.properties);
            suggs.splice(suggs.indexOf('options'), 1);
            this.setState({
                suggestions: [...suggs, 'option 1', 'option 2', 'option 3'],
                chips: res[1].data.config.filters,
                loading: false
            })

        })
        
    }

    sync = () => {
        this.setState({loading: true})
        axios.get('/api/sync').then(res => {
            console.log(res)
            this.setState({loading: false})
        })
    }

    save = () => {
        this.setState({saving: true})
        axios.post('/api/user-config', {config: {filters: this.state.chips}}).then(res => {
            console.log(res)
            this.setState({saving: false})
        })
    }

    setChips = chips => this.setState({chips})


    render() {

        return (
            <div className={styles.dashboard}>
                <h2>Dashboard</h2>
                <div className="my-2">
                    <button className={styles.btn} onClick={this.sync}>
                        {this.state.syncing ? 'Working...' : 'Sync'}
                    </button>
                </div>
                <div className="mb-2">
                    <Chips value={this.state.chips}
                        onChange={this.setChips}
                        suggestions={this.state.suggestions}
                    />
                </div>
                <button className={styles.btn} onClick={this.save} >{this.state.saving ? 'Saving...' : 'Save'}</button>
            </div>
        )
    }
}

export default Dashboard;
