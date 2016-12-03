const React = require('react');
import './IndividualRecipes.css';
import { Modal, Button } from 'react-bootstrap';
import ModalContent from '../ModalContent/ModalContent';

const IndividualRecipes = React.createClass({  
    getInitialState: function() {
        return {
            showModal: false,
            savedButton: false
        }
    },
    savedButtonClick: function() {
        if (!this.state.savedButton) {
            this.props.saveUserRecipe(this.props.recipe.id);
            this.setState({
                savedButton: true
            })
        }
        else {
            this.props.deleteSavedRecipe(this.props.recipe.id)
            this.setState({
                savedButton: false
            })
        }
    },
    open() {
        this.setState({ showModal: true });
    },
    close() {
        this.setState({ showModal: false });
    },

    render: function() {
    
        return (
            <div id="individual-recipe-wrapper">
                <div id="button-and-image">
                    {this.state.savedButton ?
                        <button id="save-button" onClick={this.savedButtonClick}><i id="favourite-button" className="material-icons 24md">star</i></button>
                        : <button id="save-button" onClick={this.savedButtonClick}><i id="favourite-button" className="material-icons 24md">star_border</i></button>
                    }
                    <img src={this.props.recipe.image} alt="recipe representation"/>
                </div>
                <div className="seperating-line">
                </div>
                <h2>{this.props.recipe.title}</h2>
             
                <div id="read-more-wrapper">
                    <button className="button" onClick={this.open}>SHOW RECIPE</button>
                </div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <ModalContent recipeId={this.props.recipe.id} title={this.props.recipe.title} image={this.props.recipe.image}
                    servings/>
                    <Modal.Footer>
                        <Button className="button" onClick={this.close}>CLOSE</Button>
                    </Modal.Footer>
                </Modal>   
            </div>
        )
    }
})

module.exports = IndividualRecipes;