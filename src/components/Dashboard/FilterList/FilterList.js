import React, { Component } from 'react'
import styles from './FilterList.module.css'
import { throws } from 'assert';

class FilterList extends Component {

    render() {
      
      return (
        <>
          <h3 className="mb-4">Filter List</h3>
          {
            this.props.filters.map(filter => {
              return (
                <div className="flex mb-4">
                  <p className="mr-2">{filter}</p>
                  <input type="checkbox" onChange={this.props.onSelect.bind(this, filter)}/>
                </div>
              )
            })
          }
        </>
      )
    }
}

export default FilterList;
