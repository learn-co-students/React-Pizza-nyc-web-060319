import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
state = {
  allPizzas: [],
  key: 11,                    // counter to set *id*
  topping: "",                // is used for new pizza... 
  size: "",
  vegetarian: false,
  editingPizzaFlag: false
}

// SEE PIZZA FORM - LINE 46 FOR WHAT IS STILL LEFT TO FIX. 


componentDidMount(){
  fetch("http://localhost:3000/pizzas")
  .then(res => res.json() )
  .then( pizzaJson => {
    this.setState({allPizzas: pizzaJson})
  })
}


addNewPizza = (e, pizzaStateTF) => {
  e.preventDefault()
  let vegetarianValue = (pizzaStateTF.selectedOption == "Vegetarian") ? true : false

  let newPizza = { 
      id: this.state.key,                    // id
      topping: e.target[0].value,
      size: e.target[1].value,
      vegetarian: vegetarianValue
  }
  let newKey = this.state.key += 1;
  let allPizzasCopy = this.state.allPizzas
  this.setState({key: newKey,  allPizzas:[...allPizzasCopy, newPizza]})
 
  return(
    //                                  I DONT NEED TO RETURN TABLE ROW, JUST ADD TO ALL PIZZAS, 
    //                                  REACT WILL SEE STATE CHANGE AND DO FOR ME. 
    ""
    )
}


editPizza = (e, pizzaToEdit) => {
  e.preventDefault()
  console.log(e.target.parentElement)
  console.log("pizzaToEdit (key) -- ", pizzaToEdit)
  let tableRow = e.target.parentElement
  // console.log("tableRow Tests: ", typeof tableRow)  // its an object!
  console.log("tableRow Tests: ", tableRow.children[0].innerText)  // spinach
  console.log("tableRow Tests: ", tableRow.children[1].innerText)  // small
  console.log("tableRow Tests: ", tableRow.children[2].innerText)  // true

  this.setState({
    topping: tableRow.children[0].innerText,               
    size: tableRow.children[1].innerText,
    vegetarian: tableRow.children[2].innerText,
    editingPizzaFlag: pizzaToEdit
  })

  // FIND AND EDIT OLD PIZZA  (BY KEY#), THEN REPLACE NEW   
  // console.log("state in editPizza is: ", this.state)
}


updatePizza= (e, formState, pizzaId) => {
  e.preventDefault()
  console.log("pizzaToEdit  in updatePizza ", pizzaId)
  console.log("e.target in updatePizza 0 topping", e.target[0].value)
  console.log("e.target in updatePizza 1 size", e.target[1].value)
  let vegetarianValue = (formState.selectedOption == "Vegetarian") ? true : false
  console.log("Vegetarian T/F :", vegetarianValue)
  let allPizzasCopy = this.state.allPizzas

  for (const pizza of allPizzasCopy) { 
    if (pizza.id === pizzaId){
      console.log("PIZZA Match - ", pizza)
      console.log("PIZZA Match Id - ", pizza.id)

      // only want to update if there were changes. 
      pizza["vegetarian"] = vegetarianValue
      if (e.target[0].value){
        pizza.topping = e.target[0].value
      }
      if (e.target[1].value){
        pizza.size = e.target[1].value
      }
      // (e.target[0].value ?  (pizza.topping = e.target[0].value) : null )  "NOT A FUNCTION ERROR"
      // (e.target[1].value ?  (pizza.size = e.target[1].value) : null )
    }
  }

  this.setState({allPizzas: allPizzasCopy, editingPizzaFlag: false})
}


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm addNewPizza={this.addNewPizza} pizzaInEdit={this.state} updatePizza={this.updatePizza} />
        <PizzaList allPizzas={this.state.allPizzas} editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;
