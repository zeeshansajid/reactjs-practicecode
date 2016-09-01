import React from 'react';
import {Container} from 'flux/utils';

import DraftStore from '../flux/stores/DraftStore';
import CardActionCreators from '../flux/actions/CardActionCreators';
import CardForm from './CardForm.jsx';

class NewCard extends React.Component {
	  static getStores() {
	    return [DraftStore];
	  }
	
	  static calculateState(prevState) {
	    return {
	      draft: DraftStore.getState(),
	    };
	  }

    componentDidMount() {
        setTimeout(() => {
            CardActionCreators.createDraft();
        }, 0)    
    }
    
    handleChange(field, value) {
        CardActionCreators.updateDraft(field, value);
    }
    
    handleSubmit(evt) {
		evt.preventDefault();
		CardActionCreators.addCard(this.state.draft);
		this.context.router.push('/');
    }
    
    handleClose() {
        this.context.router.push('/');
    }
    
    render() {
        return (
            <CardForm draftCard={this.state.draft}
                        buttonLabel="Create Card"
                        handleChange={this.handleChange.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                        handleClose={this.handleClose.bind(this)}
            />
        )
    }
}

// Have to include this statement
// http://stackoverflow.com/questions/36330617/this-props-history-is-deprecated-react-router
NewCard.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Container.create(NewCard);