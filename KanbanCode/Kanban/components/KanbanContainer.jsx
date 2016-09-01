import React from 'react';
import {Link} from 'react-router';
import List from './List.jsx';

class KanbanContainer extends React.Component {
    render() {
        
        return(
            <div className="app">
                <Link to='/new' className="float-button">+</Link>
                
                <List id="todo" title="To Do" 
                    cards={
                        this.props.cards.filter((card) => card.status === "todo") 
                    }
                />
                <List id="in-progress" title="In Progress" 
                    cards={
                        this.props.cards.filter((card) => card.status === "in-progress") 
                    }
                />
                <List id="done" title="Done" 
                    cards={
                        this.props.cards.filter((card) => card.status === "done") 
                    }
                />
                
                {this.props.children}
            </div>
        );
    }
}

export default KanbanContainer;