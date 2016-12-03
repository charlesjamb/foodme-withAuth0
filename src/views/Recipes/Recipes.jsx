var React = require('react');
import './Recipes.css';
import IndividualRecipes from "./../IndividualRecipes/IndividualRecipes";


var RecipeOutput = React.createClass({
    
    render: function() {
        let recipesArray= this.props.recipes;

       return (

            <ul className="overlay">
                {recipesArray.map((recipe, i) => 
                <li key={i} className="recipe-list">
                    <IndividualRecipes 
                    className="recipes-list" 
                    recipe={recipe}
                    saveUserRecipe={this.props.saveUserRecipe}
                    deleteSavedRecipe={this.props.deleteSavedRecipe}
                    />
                </li>
                )}
            </ul>

        );
    }
});

module.exports = RecipeOutput;