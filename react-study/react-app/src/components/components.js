/**
 * Created by Administrator on 2017/8/16 0016.
 */
import React from 'react'

let ProductCategoryRow = React.createClass({
  render() {
    return (
      <tr>
        <th colSpan="2">{this.props.category}</th>
      </tr>)
  }
})

let ProductRow = React.createClass({
  render: function () {
    let name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>

    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    )
  }
})

let ProductTable = React.createClass({
  render() {
    let rows = []
    let lastCategory = null
    this.props.products.forEach((product) => {
      console.log(product)
      if (product.name.indexOf(this.props.filterText) === -1 ||
        (!product.stocked && this.props.inStockOnly)) {
        return
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category}/>)
      }
      rows.push(<ProductRow product={product} key={product.name}/>)
      lastCategory = product.category
    })
    return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
})

let SearchBar = React.createClass({
  handleChange() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    )
  },
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            ref="inStockOnlyInput"
            onChange={this.handleChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    )
  }
})

export let FilterableProductTable = React.createClass({
  getInitialState() {
    return {
      filterText: '',
      inStockOnly: false
    }
  },
  handleUserInput(filterText, inStockOnly) {
    this.setState({
      filterText,
      inStockOnly
    })
  },
  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onUserInput={this.handleUserInput}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    )
  }
})

