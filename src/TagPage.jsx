import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Tag from './Tag';

class TagPage extends Component {
    render() {
        return (
            <Route path={`${this.props.match.path}/:id/`} render={props => (
                <Tag {...props} tag={props.match.params.id} />
            )} />
        );
    }
}

export default TagPage;
