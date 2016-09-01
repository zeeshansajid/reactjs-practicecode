import AppDispatcher from '../AppDispatcher';
import KanbanApi from './KanbanAPI';
import constants from '../Constants';

let CardActionCreator = {
	fetchCards() {
		AppDispatcher.dispatchAsync(KanbanApi.fetchCards(), {
			request: constants.FETCH_CARDS,
			success: constants.FETCH_CARDS_SUCCESS,
			failure: constants.FETCH_CARDS_FAILURE
		});
	},

	addCard(card) {
		AppDispatcher.dispatchAsync(KanbanApi.addCard(card), {
			request: constants.CREATE_CARD,
			success: constants.CREATE_CARD_SUCCESS,
			failure: constants.CREATE_CARD_FAILURE
		}, {card});
	},

	updateCard(origCard, draftCard) {
		AppDispatcher.dispatchAsync(KanbanApi.updateCard(origCard, draftCard), {
			request: constants.UPDATE_CARD,
			success: constants.UPDATE_CARD_SUCCESS,
			failure: constants.UPDATE_CARD_FAILURE
		}, {origCard, draftCard})
	},

	deleteCard(card) {
		AppDispatcher.dispatchAsync(KanbanApi.deleteCard(card), {
			request: constants.DELETE_CARD,
			success: constants.DELETE_CARD_SUCCESS,
			failure: constants.DELETE_CARD_FAILURE
		}, {card});
	},
	
	createDraft(card) {
	    AppDispatcher.dispatch({
	        type: constants.CREATE_DRAFT,
	        payload: {card}
	    });
	},
	
	updateDraft(field, value) {
	    AppDispatcher.dispatch({
	        type: constants.UPDATE_DRAFT,
	        payload: {field, value}
	    });
	},

	toggleCard(card) {
		AppDispatcher.dispatch({
			type: constants.TOGGLE_CARD,
			payload:  {card}
		});
	}

}

export default CardActionCreator;