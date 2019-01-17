import React, { Component } from 'react'
import styles from './Filters.module.css'
import { http } from '../../../utils'

class Filters extends Component {

    componentDidUpdate(prevProps) {
        // console.log(prevProps)
        // let data = {
        //     aggs: {

        //     }
        // }
        // http.post('/api/aggregations', data).then(res => {
        //     console.log(res)
        // })
    }

    render() {
        let filters = this.props.filters
        return (
            <div className={ styles.filters }>
                <h4 className="mb-2">Filters</h4>
                {filters.map(filter => {
                    return <p>{filter}</p>
                })}
            </div>
        )
    }
}

export default Filters
