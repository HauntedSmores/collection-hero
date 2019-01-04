import React, { Component } from 'react'
import Chips from 'react-chips'
import styles from './Dashboard.module.css'
import axios from 'axios'

class Dashboard extends Component {

    state = {
        loading: true,
        chips: [],
        suggestions: []
    }

    sync = () => {
        this.setState({loading: true})
        axios.get('/api/sync').then(res => {
            console.log(res)
            this.setState({loading: false})
        })
    }

    setChips = chips => this.setState({chips})

    componentDidMount() {
        this.setState({loading: false})
        axios.get('/api/mapping').then(res => {
            let suggs = Object.keys(res.data.product.properties);
            this.setState({suggestions: suggs})
        })
    }

    render() {

        return (
            <div className={styles.dashboard}>
                <h2>Dashboard</h2>
                <div className="my-2">
                    <button className={styles.btn} onClick={this.sync}>
                        {this.state.loading ? 'Working...' : 'Sync'}
                    </button>
                </div>
                <Chips value={this.state.chips}
                    onChange={this.setChips}
                    suggestions={this.state.suggestions}
                />
            </div>
        )
    }
}

export default Dashboard;
