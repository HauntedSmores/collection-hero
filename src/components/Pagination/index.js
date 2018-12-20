import React, { Component } from 'react'
import styles from './Pagination.module.css'

class Pagination extends Component {

    render() {
        return (
            <div>
                { this.props.count }
            </div>
        )
    }
}

export default Pagination;