import React, { Component } from 'react'
import styles from './FilterList.module.css'
import axios from 'axios'
import { update_config } from '../../../store/actions'

class FilterList extends Component {

  state = {
    loading: true,
    saving: false,
    filter_options: [
      'product_type',
      'option1',
      'option2',
      'option3',
      'vendor',
      'tags'
    ]
  }

  componentDidMount() {
    let filters = this.state.filter_options.map(option => {
      let selected_filter = this.props.selectedFilters.find(filter => filter.name === option)
      console.log(selected_filter)

      return selected_filter ? { ...selected_filter, enabled: true } : {
        name: option,
        label: option,
        enabled: false
      }
    })

    this.setState({loading: false, filter_options: filters})
  }

  setLabel(filter, $event) {
    console.log($event.target.value)
    let filters = [ ...this.state.filter_options ]
    let index = filters.indexOf(filter)
    let temp_filter = filters[index]
    temp_filter.label = $event.target.value
    this.setState({ filter_options: filters })
  }

  onSelect(option, $event) {
    // console.log(option)
    console.dir($event.target.checked)
    let filters = [ ...this.state.filter_options ]
    let index = filters.indexOf(option)
    filters[index].enabled = $event.target.checked
    this.setState({ filter_options: filters })
  }

  selectAll = () => {
    let filters = this.state.filter_options.map(filter => {
      return { ...filter, enabled: true }
    })
    this.setState({filter_options: filters})
  }

  clearAll = () => {
    let filters = this.state.filter_options.map(filter => {
      return { ...filter, enabled: false }
    })
    this.setState({filter_options: filters})
  }

  save = () => {
      this.setState({saving: true})
      axios.post('/api/user-config', {config: {filters: this.state.filter_options}}).then(res => {
          console.log(res)
          this.setState({saving: false})
          this.props.dispatch(update_config({filters: this.state.filter_options}))
      })
  }

  render() {

    let options = this.state.filter_options
    let loading = this.state.loading
    
    return (
      <>
        <h3 className="mb-4">Filter List</h3>
        <div className="flex mb-4">
          <button className="btn mr-2" onClick={this.clearAll}>Clear All</button>
          <button className="btn" onClick={this.selectAll}>Select All</button>
        </div>
        { loading ? null :
          options.map(option => {
            return (
              <div className="flex mb-4">
                <p className="mr-2">{option.name}</p>
                <input className="mr-4" type="checkbox" onChange={this.onSelect.bind(this, option)} checked={option.enabled}/>
                <input type="text" onChange={this.setLabel.bind(this, option)} value={option.label}/>
              </div>
            )
          })
        }
        <button className="btn" onClick={this.save} >{this.state.saving ? 'Saving...' : 'Save'}</button>
      </>
    )
  }
}

export default FilterList;
