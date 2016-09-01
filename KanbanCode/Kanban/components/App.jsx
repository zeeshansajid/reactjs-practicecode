import React from 'react';
import {Container} from 'flux/utils';

import CardActionCreators from '../flux/actions/CardActionCreators';
import CardStore from '../flux/stores/CardStore';
import KanbanContainer from './KanbanContainer.jsx';

class App extends React.Component {
	
	  static getStores() {

	    return [CardStore];
	  }
	
	  static calculateState(prevState) {
	    return {
	      cards: CardStore.getState(),
	    };
	  }

    componentDidMount() {
        CardActionCreators.fetchCards();
    }
    
    render() {
    	let kanbanContainer = React.cloneElement(
    		this.props.children, {
    			cards: this.state.cards,
    		});
    		
    	return (
    		<div>
    			<h1>Kanban Project</h1>
    			<div>{kanbanContainer}</div>
    		</div>
    	)
    }

}

export default Container.create(App);