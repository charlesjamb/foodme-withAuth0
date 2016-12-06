import React, {Component} from 'react';
import axios from 'axios';
import {key} from '../../utils/mashapeKey'

export class RecipeContainer extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			recipes: []
		};
	}

	_getRecipes(e) {
		e.preventDefault();
		axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${this.props.ingredients.toString()}&number=24&ranking=2&limitLicense=true`, key)
		.then(data => {
			console.log(data);
			this.setState({
				recipes: data
			});
		})
		.catch(err => {
			console.log(err.stack);
		})
	}

	render() {
		return (
			<p>Hello, world!</p>
		);
	}
};