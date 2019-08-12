import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    editPizza: {}
  }

  componentDidMount() {
    fetch("http://localhost:3000/pizzas").then(
      resp => resp.json()
    ).then(
      pizzas => {
        this.setState({
          pizzas: pizzas,
        })
      }
    )
  }

  changeHandler = (event) => {
    const inputType = event.target.name
    if (inputType.startsWith('vegetarian')) {
      this.setState({
        editPizza: {
          ...this.state.editPizza,
          vegetarian: event.target.name.includes('true') ? true : false
        }
      })
    }
    else {
      this.setState({
        editPizza: {
          ...this.state.editPizza,
          [inputType]: event.target.value
        }
      })
    }
  }


  editButtonHandler = (e, pizzaObj) => {
    this.setState({ editPizza: pizzaObj })
  }

  editFormHandler = (e, updatedPizzaObj) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPizzaObj)
    }
    fetch(`http://localhost:3000/pizzas/${updatedPizzaObj.id}`, options).then(
      resp => resp.json()
    ).then(
      editedPizza => {
        const oldPizzas = [...this.state.pizzas]
        const newPizzas = oldPizzas.map(
          oldPizza => oldPizza.id === editedPizza.id ? editedPizza : oldPizza
        )
        this.setState({ pizzas: newPizzas })
      }
    )
  }

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm changeHandler={this.changeHandler} pizza={this.state.editPizza} editFormHandler={this.editFormHandler} />
        <PizzaList pizzas={this.state.pizzas} editButtonHandler={this.editButtonHandler} />
      </Fragment>
    );
  }
}

export default App;
