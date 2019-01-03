import React, { Component } from 'react'
import styles from './Dashboard.module.css'
import axios from 'axios'

class Dashboard extends Component {

    state = {
        loading: false
    }

    sync() {
        this.setState({loading: true})
        axios.get('/api/sync').then(res => {
            console.log(res)
            this.setState({loading: false})
        })
    }

    render() {

        return (
            <div className={styles.grid}>
                <h2>Dashboard</h2>
                {this.state.loading ? <p>Syncing...</p> : <button onClick={this.sync.bind(this)}>Sync</button>}
            </div>
        )
    }
}

export default Dashboard;
