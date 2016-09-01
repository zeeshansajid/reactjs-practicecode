import React from 'react';
import {Container} from 'flux/utils';

import CardForm from './CardForm.jsx';
import DraftStore from '../flux/stores/DraftStore';
import CardStore from '../flux/stores/CardStore';
import CardActionCreators from '../flux/actions/CardActionCreators';

class EditCard extends React.Component {
	  static getStores() {
	    return [DraftStore];
	  }
	
	  static calculateState(prevState) {
	    return {
	      draft: DraftStore.getState(),
	    };
	  }
	  
	componentDidMount() {
		let card = this;
		setTimeout(() => {
			CardActionCreators.createDraft(CardStore.getCard(card.props.params.card_id));
		}, 0);
	}

	handleChange(field, value) {
		CardActionCreators.updateDraft(field, value);
	}

	handleSubmit(evt) {
		evt.preventDefault();
		CardActionCreators.updateCard(
			CardStore.getCard(this.props.params.card_id),
			this.state.draft
		)
		this.context.router.push('/');
	}

	handleClose(e) {
		this.context.router.push('/');
	}
    
    render() {
        return (
            <CardForm draftCard={this.state.draft}
					  buttonLabel="Save Card"
					  handleChange={this.handleChange.bind(this)}
					  handleSubmit={this.handleSubmit.bind(this)}
					  handleClose={this.handleClose.bind(this)}
			/>
        )
    }
}

EditCard.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Container.create(EditCard);