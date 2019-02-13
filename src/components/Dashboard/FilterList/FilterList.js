import React, { Component } from 'react'
import styles from './FilterList.module.css'
import axios from 'axios'
import { update_config } from '../../../store/actions'
import Filter from './Filter/Filter'

class FilterList extends Component {

  state = {
    saving: false,
    filters: this.props.filters
  }

  setLabel(filter, $event) {
    let filters = this.state.filters.map(filter => {
      return {...filter}
    })
    let temp_filter = filters.find(item => item.name == filter.name)
    temp_filter.label = $event.target.value
    this.setState({ filters })
  }
  
  onSelect(filter, $event) {
    let filters = this.state.filters.map(filter => {
      return {...filter}
    })
    let temp_filter = filters.find(item => item.name == filter.name)
    temp_filter.enabled = $event.target.checked
    this.setState({ filters })
  }

  selectAll = () => {
    let filters = this.state.filters.map(filter => {
      return { ...filter, enabled: true }
    })
    this.setState({filters})
  }

  clearAll = () => {
    let filters = this.state.filters.map(filter => {
      return { ...filter, enabled: false }
    })
    this.setState({filters})
  }

  save = () => {
      this.setState({saving: true})
      axios.post('/api/user-config', {config: {filters: this.state.filters}}).then(res => {
          this.setState({saving: false})
          this.props.dispatch(update_config({filters: this.state.filters}))
      })
  }

  render() {

    let options = this.state.filters
    
    return (
      <>
        <h3 className="mb-4">Filter List</h3>
        <div className="flex mb-4">
          <button className="btn mr-2" onClick={this.clearAll}>Clear All</button>
          <button className="btn" onClick={this.selectAll}>Select All</button>
        </div>
        {options.map(option => {
          return (
            <div className="flex mb-4">
              <Filter filter={option} filterSelect={this.onSelect.bind(this, option)}
              setLabel={this.setLabel.bind(this, option)}></Filter>
            </div>
          )
        })}
        <button className="btn" onClick={this.save} >{this.state.saving ? 'Saving...' : 'Save'}</button>
      </>
    )
  }
}

export default FilterList;
