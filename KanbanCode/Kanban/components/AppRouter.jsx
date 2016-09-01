import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import App from './App.jsx';
import KanbanContainer from './KanbanContainer.jsx';
import NewCard from './NewCard.jsx';
import EditCard from './EditCard.jsx';

class AppRouter extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route component={App}>
                    <Route path="/" component={KanbanContainer}>
                        <Route path="new" component={NewCard}/>
                        <Route path="edit/:card_id" component={EditCard}/>
                    </Route>
                </Route>
            </Router>
        );
    }
}

export default AppRouter;