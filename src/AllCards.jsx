import React, { Component } from 'react';
import { Card, CardColumns, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AllCards.css'
import * as cardIndex from './card-index.json';

class AllCards extends Component {
    constructor(props) {
        super(props);
        this.renderCardLinks = this.renderCardLinks.bind(this);
    }

    renderCardLinks() {
        let arr = [];
        for (let card of cardIndex.cards) {
            arr.push(
                <Col sm={6}>
                    <Link to={`/card/${card.card}`} >
                        <Card className="All-Cards-Card">
                            <Card.Img className="All-Cards-Card-Img" variant="top" src={card.img} />
                            <Card.Body>
                                <Card.Title>{card.name}</Card.Title>
                                <Card.Text>{card.date}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            )
        }

        return arr;
    }

    render() {
        return (
            <Container className='justify-content-center'>
                <h3 className="All-Cards-Heading text-center">All Scorecards</h3>
                <Row>
                    {this.renderCardLinks()}
                </Row>
            </Container>
        );
    }
}

export default AllCards;
