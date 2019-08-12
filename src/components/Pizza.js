import React from "react"

const Pizza = () => {
  return(
    <tr>

      {/* <td>{"Replace Me With Pizza Topping"}</td> */}
      <td>{this.props.topping}</td>
      {/* <td>{"Replace Me With Pizza Size"}</td>       */}
      <td>{this.props.size}</td>
      {/* <td>{"Replace Me With Vegatarian"}</td> */}
      <td>{this.props.vegetarian}</td>
      <td><button type="button" className="btn btn-primary">Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
