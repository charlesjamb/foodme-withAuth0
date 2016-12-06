import React from 'react';

import './HomepageContent.css';
import {Button /*, Grid, Row, Col*/} from 'react-bootstrap';

import RecipeContainer from '../RecipeContainer/RecipeContainer';

const HomepageContent = React.createClass({

	getInitialState() {
		return {
			ingredients: [],
		};
	},

	addIngredient() {
		let userIngredientInput = this.refs.userInput.value;
		let ingredient = this.state.ingredients.concat(userIngredientInput);
		this.setState({
			ingredients: ingredient
		});
	},

	// deleteIngredient(i, e) {
	// 	e.preventDefault();

	// 	this.setState(state => {
	// 		state.ingredients.splice(i, 1);
	// 		return {
	// 			ingredients: this.state.ingredients
	// 		};
	// 	});
	// },

	render() {
		console.log('HomepageContent ingredients ', this.state.ingredients)
		return (
			<div className="homepageDiv">
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
				<div className="main-div">

					<p className="description">Having trouble finding what you would like to eat? No problem!
					FoodMe is a website that will help you find the perfect meal to prepare today.
					Just enter the list of ingredients you would like to use below, and let FoodMe suggest you recipes to make with these!</p>
					<h2 className="homepageTitles">Please enter your ingredients to begin.</h2>

					<form className="form">
						<input ref="userInput" className="ingredientsInput" type="text" />
						<Button className="button" onClick={this.addIngredient.bind(null, this)}>ADD INGREDIENT</Button>
					</form>

					<div>
						<RecipeContainer ingredients={this.state.ingredients}/>
					</div>

				</div>
			</div>
		);
	}
});

module.exports = HomepageContent;