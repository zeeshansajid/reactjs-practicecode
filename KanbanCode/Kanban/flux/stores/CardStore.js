import {ReduceStore} from 'flux/utils';
import update from 'react-addons-update';

import AppDispatcher from '../AppDispatcher';
import constants from '../Constants';

class CardStore extends ReduceStore {
    getInitialState() {
        return [];
    }
    
    getCardIndex(id) {
        return this.getState().findIndex((card) => card._id === id);
    }
    
    getCard(id) {
        return this.getState().find((card) => card._id === id);
    }

    reduce(state, action) {

        let cardIndex;
        switch(action.type) {
            
            case constants.FETCH_CARDS_SUCCESS:
                action.payload.response.forEach(function(card)
                {
                    card.toggleState = "show";
                });
                return action.payload.response;
            
            case constants.CREATE_CARD:
                return update(state, {$push: [action.payload.card]});
            
            case constants.CREATE_CARD_SUCCESS:
                cardIndex = this.getCardIndex(action.payload.card._id);
                return update(state, {
                    [cardIndex]: {
                        _id: {$set: action.payload.response._id}
                    }
                });
            
            case constants.CREATE_CARD_FAILURE:
                cardIndex = this.getCardIndex(action.payload.card._id);
                return update(state, {
                    $splice: [[cardIndex], 1]
                });
            
            case constants.UPDATE_CARD:
                cardIndex = this.getCardIndex(action.payload.origCard._id);
                return update(state, {
                    [cardIndex]: {
                        $set: action.payload.draftCard
                    }
                });
                
            case constants.UPDATE_CARD_FAILURE:
                cardIndex = this.getCardIndex(action.payload.origCard._id);
                return update(state, {
                    [cardIndex]: {
                        $set: action.payload.origCard
                    }
                });
                
            case constants.DELETE_CARD:
                cardIndex = this.getCardIndex(action.payload.card._id);
                return update(state, {
                    $splice: [[cardIndex, 1]]
                });
            
            case constants.DELETE_CARD_FAILURE:
                cardIndex = this.getCardIndex(action.payload.card._id);
                return update(state, {
                    $splice: [[cardIndex, 0, action.payload.card]]    
                });
            
            case constants.CREATE_TASK:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(state, {
                    [cardIndex]: {
                        tasks: {$push: [action.payload.task]}
                    }
                });
                
            case constants.CREATE_TASK_SUCCESS:
                cardIndex = this.getCardIndex(action.payload.cardId);
                action.payload.response.toggleState = "show";
                return update(state, {
                    [cardIndex]: {
                        $set: action.payload.response
                    }
                });
                
            case constants.CREATE_TASK_FAILURE:
                cardIndex = this.getCardIndex(action.payload.cardId);
                let taskIndex = state[cardIndex].tasks.findIndex(
                    (task) => (task._id === action.payload.task._id)
                );
                return update(state, {
                    [cardIndex]: {
                        tasks: {
                            $splice: [[taskIndex, 1]]
                        }
                    }
                });
            
            case constants.DELETE_TASK:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(state, {
                    [cardIndex]: {
                        tasks: {
                            $splice: [[action.payload.taskIndex, 1]]
                        }
                    }
                });
                
            case constants.DELETE_TASK_FAILURE:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(state, {
                    [cardIndex]: {
                        tasks: {
                            $splice: [[action.payload.taskIndex, 0, action.payload.task]]
                        }
                    }
                });
                
            case constants.TOGGLE_TASK:
            case constants.TOGGLE_TASK_FAILURE:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(state, {
                    [cardIndex]: {
                        tasks: {
                            [action.payload.taskIndex]: {
                                done: {
                                    $apply: (done) => !done
                                }
                            }
                        }
                    }
                });

            case constants.TOGGLE_CARD:
                cardIndex = this.getCardIndex(action.payload.card._id);

                if(action.payload.card.toggleState == "show")
                    action.payload.card.toggleState = "hide";
                else
                    action.payload.card.toggleState = "show";

                return update(state, {
                    [cardIndex]: {
                        $set: action.payload.card
                    }
                });

            default:
                return state;
        }
    }
}
export default new CardStore(AppDispatcher);