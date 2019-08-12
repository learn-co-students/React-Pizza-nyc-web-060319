import React, { Component } from 'react';
class Pizza extends Component {
  render() {
    const { pizza } = this.props
    return (
      <tr>
        <td>{pizza.topping}</td>
        <td>{pizza.size}</td>
        <td>{pizza.vegetarian.toString()}</td>
        <td><button onClick={e => this.props.editButtonHandler(e, pizza)} type="button" className="btn btn-primary">Edit Pizza</button></td>
      </tr>
    )
  }
}

export default Pizza
