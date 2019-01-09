import React, { Component } from 'react'
import styles from './Filters.module.css'

class Filters extends Component {

    render() {
        let filters = this.props.filters
        return (
            <div className={ styles.filters }>
                <p>Filters</p>
                {filters.map(filter => {
                    return <p>{filter}</p>
                })}
            </div>
        )
    }
}

export default Filters;
