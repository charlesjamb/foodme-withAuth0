import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {key} from '../../utils/mashapeKey.js';

class RecipeContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			recipes: []
		};
	}

	_getRecipes() {
		console.log('_getRecipes')
		axios.defaults.headers.common['X-Mashape-Key'] = key;
		axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${this.props.ingredients.toString()}&number=24&ranking=2&limitLicense=true`)
		.then(data => {
			this.setState({
				recipes: data
			});
		})
		.catch(err => {
			console.log(err.stack);
		})
	}

	componentDidMount() {
		console.log('RecipeContainer mounts');
	}

	componentDidUpdate(prevProps) {
		console.log('RecipeContainer updates');
		if (prevProps.ingredients !== this.props.ingredients) {
			this._getRecipes();
		};
	}

	render() {
		console.log('RecipeContainer ingredients ', this.props.ingredients);
		console.log('RecipeContainer recipes', this.state.recipes);
		return (
				<div>
					<p>Hello, world!</p>
				</div>
		);
	}
}

RecipeContainer.propTypes = {
	ingredients: PropTypes.array
};

export default RecipeContainer;