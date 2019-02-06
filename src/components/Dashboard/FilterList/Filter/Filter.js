import React, { Component } from 'react'
import styles from './Filter.module.css'
import axios from 'axios'

class Filter extends Component {

  componentDidMount() {
  }

  filterSelect = (e) => {
    console.log(e)
  }

  render() {
    let { name, enabled, label } = this.props.filter
    
    return (
      <div>
        <div className="flex items-center mb-2">
          <h4 className="mr-2">{ name }</h4>
          <input type="checkbox" checked={enabled} onChange={this.props.filterSelect}/>
        </div>
        { enabled ?
          <input type="text"
            placeholder={ label }
            value={ label || name }
            onChange={this.props.setLabel}
          /> : null
        }
      </div>
    )
  }
}

export default Filter;
