import React, { Component } from 'react'
import styles from './Pagination.module.css'
import axios from 'axios'

class Pagination extends Component {

    constructor(props) {
        super(props)
        
        let pages = Math.ceil(props.count / props.perPage)
        this.state = {
            pages: [],
            active: this.props.activePage
        }

        for (let i = 1; i <= pages; i++) {
            this.state.pages.push(i)
        }

    }

    setPage(page) {
        this.props.getPage(page)
    }

    render() {
        const { pages } = this.state
        if (pages.length > 1) {

            return (
                <div className={styles.pagination}>
                    { this.state.active > 1 ? <p onClick={ this.setPage.bind(this, this.state.active - 1) }>Previous</p> : null}
                    <>
                        {
                            pages.map(page => {
                                let page_class = page === this.state.active ? 
                                    [styles.pagination_item, styles.pagination_item_active].join(' ') :
                                    styles.pagination_item

                                return (
                                    <p className={ page_class }
                                        onClick={ this.setPage.bind(this, page) }>
                                        { page }
                                    </p>
                                )
                            })
                        }
                    </>
                    { this.state.active != this.state.pages.length ? <p onClick={ this.setPage.bind(this, this.state.active + 1) }>Next</p> : null}
                </div>
            )
        } else return null
    }
}

export default Pagination;