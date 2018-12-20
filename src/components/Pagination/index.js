import React, { Component } from 'react'
import styles from './Pagination.module.css'
import axios from 'axios'

class Pagination extends Component {

    constructor(props) {
        super(props)
        let pages = Math.ceil(props.count / props.perPage)
        this.state = {
            pages: []
        }

        console.log(pages)

        for (let i = 1; i <= pages; i++) {
            this.state.pages.push(i)
        }

    }

    render() {
        const { pages } = this.state
        if (pages.length > 1) {
            return (
                <div className={styles.pagination}>
                    {
                        pages.map(page => {
                            return (
                                <p className={styles.pagination_item}
                                    onClick={ this.props.getPage.bind(this, page) }>{ page }</p>
                            )
                        })
                    }
                </div>
            )
        } else return null
    }
}

export default Pagination;