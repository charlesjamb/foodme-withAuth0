import './HomepageContent.css';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import Ingredient from './../IngredientHomepage/IngredientHomepage';
import React from 'react';
import $ from 'jquery';
import RecipeObject from '../RecipeObject/RecipeObject';
import RecipeContainer from '../RecipeContainer/RecipeContainer';

var HomepageContent = React.createClass({
    getInitialState() {
        return {
            recipes: null,
            recipesId: null,
            userInput: "",
            isLoading: false,
            ingredients: [],
        };
    },
    _getRecipes(e) {
        e.preventDefault();
        var self = this;
        $.ajax({
            url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${this.state.ingredients.toString()}&number=24&ranking=2&limitLicense=true`,
            type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
            data: {}, // Additional parameters here
            dataType: 'json',
            success: function(data) {
                self.setState({
                    recipes: data,
                    recipesId: data.id
                });
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", "IOXxGwmjbcmshk5Fl9AKuHX5WCLdp1kZ21fjsneOpkbp8wAgkG"); // Enter here your Mashape key
            }
        });
    },
    _userInput(e) {
        e.preventDefault();
        this.setState({
            userInput: this.refs.userInput.value
        });
        this._getRecipes();
    },
    _handleButtonClick(e) {
        e.preventDefault();

        let userIngredientInput = this.refs.userInput.value;
        let ingredient = this.state.ingredients.concat(userIngredientInput);
        this.setState({
            ingredients: ingredient
        });
    },
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.ingredients !== this.state.ingredients) {
            this._getRecipes();
        }
    },
    deleteIngredient(i, e) {
        e.preventDefault();

        this.setState(state => {
            state.ingredients.splice(i, 1);
            return {
                ingredients: this.state.ingredients
            };
        });
    },
    render() {
        return (
            <div className="homepageDiv">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <div className="main-div">
                    <p className="description">Having trouble finding what you would like to eat? No problem!
                    FoodMe is a website that will help you find the perfect meal to prepare today.
                    Just enter the list of ingredients you would like to use below, and let FoodMe suggest you recipes to make with these!</p>
                    <h2 className="homepageTitles">Please enter your ingredients to begin.</h2>
                    <form className="form">
                        {this.state.recipes ? <p>scroll down to see what FoodMe found!</p> : ""}
                        <input ref="userInput" className="ingredientsInput" type="text" />
                        <Button className="button" onClick={this._handleButtonClick.bind(this)}>ADD INGREDIENT</Button>
                        <Button bsStyle="primary" onClick={this._getRecipes} className="button">SEARCH</Button>
                        <div className="ingredients">
                            {this.state.ingredients.map((ingredient, i) => 
                                <li key={i}>
                                    <Ingredient ClassName="ingredient-list" ingredient={ingredient}  onClick={(evt) => this.deleteIngredient(i, evt)}/>
                                </li>
                            )}
                        </div>
                    </form>
                    
                    <Grid className="recipes-content">
                        <Row className="recipes-row">
                            <Col xs={12}>
                                {this.state.recipes ? 
                                    (this.state.recipes[0] ?
                                        <h2 className="homepageTitles">Here are your recipes suggestions: </h2>
                                        : <h2 className="homepageTitles">Sorry, there are no suggestions your ingredient(s).</h2>)
                                    : ""
                                }
                            </Col>
                            {this.state.recipes ?  
                                this.state.recipes.map(recipe => <RecipeObject recipeObject={recipe} key={recipe.id}/>) :
                                ""
                            }
                        </Row>
                    </Grid>
                    <main>
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }
});

module.exports = HomepageContent;

// <RecipeContainer ingredients={this.state.ingredients}/>