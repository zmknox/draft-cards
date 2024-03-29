import React, { Component } from 'react';
import { Route } from "react-router-dom";
import DraftCard from './DraftCard';

class CardPage extends Component {
    render() {
        return (
            <Route path={`${this.props.match.path}/:id`} render={props => (
                <DraftCard {...props} card={props.match.params.id} />
            )} />
        );
    }
}

export default CardPage;