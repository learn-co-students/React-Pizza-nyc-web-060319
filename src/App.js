import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
import { runInThisContext } from 'vm';
// import pizzas from '../db.json'
class App extends Component {
  state={
    pizzas:[],
    pizza:{},
    toppings:'',
    size:'',
    vegetarian:false,
    id:null
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then(res=>res.json())
    .then(pizzas=>this.setState({pizzas}))
    // .then(console.log)
  }

  handlePizzaClick=pizza=>{
    
    this.setState({pizza})
    console.log("2pi", pizza); 
  }

  handleChange=event=>{
    if(event.target.name==='topping'){this.setState({topping:event.target.value})}
    else if (event.target.name==='size'){this.setState({size:event.target.value})}
    else if (event.target.name==='vegetarian'){this.setState({vegetarian:true})}
    else if (event.target.name==='not-vegetarian'){this.setState({vegetarian:false})}
  }

  handleSubmit=event=>{
    const {topping, size, vegetarian} = this.state
    fetch("http://localhost:3000/pizzas"+`${this.state.id}`,{
    method:'PATCH',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  body:JSON.stringify({topping, size, vegetarian})
  }
    )
    .then(res=>res.json())
    .then(newPizza=>{const newPizzas=[...this.state.pizzas.filter(pizza=>pizza.id!==this.state.id), newPizza]
    this.setState({pizzas:newPizzas})})

  }

  render() {
    
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.pizza} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <PizzaList pizzas={this.state.pizzas} handlePizzaClick={this.handlePizzaClick}/>
      </Fragment>
    );
  }
}

export default App;
