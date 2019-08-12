import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'


class App extends Component {

  state = {
    pizzas: [],
    topping: "",
    size: "",
    vegetarian: false,
    id: null
  }

  handleRadioButton = (value) => {
    this.setState({
      vegetarian: value
    })
  }

  changeHandler = (event) => {
    let inputName = event.target.name
    this.setState({
      [inputName]: event.target.value
    })
  }

  handleSubmit = () => {
    const topping = this.state.topping
    const size = this.state.size
    const vegetarian = this.state.vegetarian

    fetch(`http://localhost:3000/pizzas/${this.state.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({topping: topping, size: size, vegetarian: vegetarian})
    })
    .then(res => res.json())
    .then(newPizza => {
      const newPizzas = [...this.state.pizzas.filter(pizza => pizza.id !== this.state.id), newPizza]
      this.setState({pizzas: newPizzas})
    })
  }

  handleClick = (pizza) => {
    console.log("Clicked", pizza)
    //how to send pizza to PizzaForm?
    this.setState({
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian,
      id: pizza.id
    })
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/pizzas")
    .then(res => res.json())
    // .then(console.log)
    .then(pizzaData => this.setState({pizzas: pizzaData}))
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          pizzas={this.state.pizzas} topping={this.state.topping} size={this.state.size} vegetarian={this.state.vegetarian}
          changeHandler={this.changeHandler}
          handleRadioButton={this.handleRadioButton}
          handleSubmit={this.handleSubmit}
          />
        <PizzaList
          pizzas={this.state.pizzas} handleClick={this.handleClick}/>
      </Fragment>
    );
  }
}

export default App;
