import React from "react"

// class PizzaForm extends React.Component{

  class PizzaForm extends React.Component{
    state={
     selectedOption: "Not Vegetarian",
     key: "",                    
     topping: "",
     size: "",
     vegetarian: "",   // was false, changed to try populating Edit form. 
     editingPizzaFlag: false

    }

        handleToppingChange = e => {  
        }
        
        
        handleSizeChange = e => {    
        }
    

        handleOptionChange = changeEvent => {
          this.setState({
            selectedOption: changeEvent.target.value
          });
        };
       

  // const PizzaForm = () => {     //Form submission was not going where needed with this as const. WHY? 
    render(){


      {console.log("InPizza Form  this.props.pizzaInEdit.editingPizzaFlag: ", this.props.pizzaInEdit.editingPizzaFlag)}  // False unless click edit! 
      {console.log("InPizza Form  this.props.pizzaInEdit.editingPizzaFlag TYPE Number=Edit, Boolean=New: ", typeof this.props.pizzaInEdit.editingPizzaFlag)}  // False unless click edit! 
      {console.log("Props in Pizza Form: ", this.props)}  // gets editingPizzaFlag for id to edit, good! 

      //  TO FIX ---- Still pre-populates with wrong thing (ie. whatever you entered last. ) 
      //  After Edit 1 pizza, can't create a New pizza, only edit the last edited.. 
      //  Radio Button pre-fill does not work

    return(

      <form onSubmit={((typeof this.props.pizzaInEdit.editingPizzaFlag === "number") ? ((e)=>this.props.updatePizza(e, this.state, this.props.pizzaInEdit.editingPizzaFlag)) :  ((e)=>this.props.addNewPizza(e, this.state)) )} >
        {/*    ^^  CHANGED ONSUBMIT, ONE OPTION FOR NEW, ONE OPTION FOR EDIT!  */}
        {/* {console.log(this.props)}  */}
        {/* {console.log(this)} */}
        <div className="form-row">
          <div className="col-5">
              <input type="text" className="form-control" placeholder={((this.props.pizzaInEdit.topping != "") ? this.props.pizzaInEdit.topping : "Pizza Topping" ) }  value={
                  //Pizza Topping Should Go Here
                  null
                }/>
          </div>
          <div className="col">
            <select placeholder={((this.props.pizzaInEdit.size != "") ?  this.props.pizzaInEdit.size : "Small") } className="form-control">
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Vegetarian" name="sameGroup" onChange={this.handleOptionChange} checked={(this.props.pizzaInEdit.vegetarian === "true") ? "checked" : ""} />
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>
            <div className="form-check">
              {/* Placeholder doesn't work!  But w checked, can't change?  <input className="form-check-input" type="radio" value="Not Vegetarian" name="sameGroup" onChange={this.handleOptionChange} placeholder={(this.props.pizzaInEdit.vegetarian === "false") ? "checked" : ""}/> */}
              <input className="form-check-input" type="radio" value="Not Vegetarian" name="sameGroup" onChange={this.handleOptionChange} checked={(this.props.pizzaInEdit.vegetarian === "false") ? "checked" : ""}/>
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>
          <div className="col">
            {/* {console.log("this.state in pizzaform: ", this.state.selectedOption)} */}
            <button type="submit" className="btn btn-success"  > {((this.state.editingPizzaFlag != false) ? "Update Pizza" : "Submit" )}</button>
          </div>
        </div>
        </form>
    
    )
  }
}
export default PizzaForm
