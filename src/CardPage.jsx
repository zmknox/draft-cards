import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DraftCard from './DraftCard';

class CardPage extends Component {
    render() {
        return (
            <Router>
                <Route path={`${this.props.match.path}/:id`} render={props => (
                    <DraftCard {...props} card={props.match.params.id} />
                )} />
            </Router>

        );
    }
}

export default CardPage;