import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Rules.css'
import { Container, Row, Col, Table, Image, Jumbotron, Button } from 'react-bootstrap';
const rules = require('./rules.json');

class Rules extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Jumbotron fluid className="jumbotron-padding rules-header-bg">
                    <Container className="justify-content-center text-center">
                        <h1 className="bold-header">{rules.title}</h1>
                        <h4 className=""><em>Last Updated: {rules.lastUpdated}</em></h4>
                    </Container>
                </Jumbotron>
                <Container>
                    <ol className="rules-list justify-content-center">
                        {rules.rules.map((rule, index) => {
                            return (
                                <li key={index}>
                                    <h3>{rule}</h3>
                                </li>
                            )
                        })}
                    </ol>
                </Container>
            </>
        );
    }
}

export default Rules;
