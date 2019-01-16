import React, { Component } from 'react'
import styles from './FilterList.module.css'
import { throws } from 'assert';

class FilterList extends Component {

    render() {

      let options = this.props.filters.map(filter => {
        return { name: filter, enabled: this.props.selectedFilters.includes(filter) }
      })
      
      return (
        <>
          <h3 className="mb-4">Filter List</h3>
          <div className="flex mb-4">
            <button className="btn mr-2" onClick={this.props.clearAll}>Clear All</button>
            <button className="btn" onClick={this.props.selectAll}>Select All</button>
          </div>
          {
           options.map(option => {
              return (
                <div className="flex mb-4">
                  <p className="mr-2">{option.name}</p>
                  <input type="checkbox" onChange={this.props.onSelect.bind(this, option.name)} checked={option.enabled}/>
                </div>
              )
            })
          }
        </>
      )
    }
}

export default FilterList;
