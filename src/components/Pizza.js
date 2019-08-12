import React from "react";
import PizzaList from "../containers/PizzaList.js"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      <td>{props.pizza.vegetarian.toString()}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary" onClick={() => props.handleClick(props.pizza)}>Edit Pizza
        </button>
      </td>
    </tr>
  )
}

export default Pizza
