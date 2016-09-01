import AppDispatcher from '../AppDispatcher';
import constants from '../Constants';
import {ReduceStore} from 'flux/utils';
import update from 'react-addons-update';
import uuid from 'node-uuid';

class DraftStore extends ReduceStore {
	getInitialState() {
		return {};
	}

	reduce(state, action) {
		switch (action.type) {
			case constants.CREATE_DRAFT:
				if(action.payload.card) {
					return update(state, {
						$set: action.payload.card
					});
				} else {
					return {
						_id: uuid.v4(),
						title: '',
						description: '',
						status: 'todo',
						tasks: []
					};
				}
			case constants.UPDATE_DRAFT:
				return update(state, {
					[action.payload.field]: {
						$set: action.payload.value
					}
				});
			default:
				return state;
		}
	}
}

export default new DraftStore(AppDispatcher);