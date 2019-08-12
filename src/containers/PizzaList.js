import React, { Component } from 'react';
import Pizza from '../components/Pizza'
class PizzaList extends Component {
  state = {
    topping: "test"
  }


  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" >Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            // console.log("this.props.allPizzas", this.props.allPizzas)  // Works, great. 
            
                        // render Pizza here
                        // ie. new form adds a pizza here 
            this.props.allPizzas.map( pizza =>{
              return(
                <tr>
                <td> {pizza.topping} </td>
                <td> {pizza.size} </td>
                <td> {pizza.vegetarian.toString()}  </td>
                {/* {console.log("pizza key in  List: ", pizza.id)}   WORKS */}  
                <td onClick={(e)=>this.props.editPizza(e, pizza.id)}> Edit Button </td>
                </tr>
              )
            } )

          }
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
