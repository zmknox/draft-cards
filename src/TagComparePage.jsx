import React, { Component } from 'react';
import { Route } from "react-router-dom";
import TagCompare from './TagCompare';

class TagComparePage extends Component {
    render() {
        return (
            <Route path={`${this.props.match.path}/:id/:id2`} render={props => (
                <TagCompare {...props} tag={props.match.params.id} compared={props.match.params.id2} />
            )} />
        );
    }
}

export default TagComparePage;
