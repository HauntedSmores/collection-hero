import React, { Component } from 'react'
import styles from './Grid.module.css'

class Grid extends Component {

    render() {
        return (
            <div className={styles.grid}>
                {
                    this.props.items.map(item => {
                        return (
                            <a href={ `/products/${item.handle}` }>
                                <img src={ item.image.src } />
                                <p>{ item.title }</p>
                            </a>
                        )
                    })
                }
            </div>
        )
    }
}

export default Grid;
