import React, { Component } from 'react';
import { Card, CardColumns, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Landing.css'
import * as cardIndex from './card-index.json';

class Landing extends Component {
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
                        <Card className="Home-Card">
                            <Card.Img className="Home-Card-Img" variant="top" src={card.img} />
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
                <Image className='Hero-Image text-center' src='/img/draft-shield.png' fluid />
                <h3 className="Home-Heading text-center">Scorecard Index</h3>
                <Row>
                    {this.renderCardLinks()}
                </Row>
                <h4 className="Home-Bottom-Link text-center"><Link to={`/rules/`}>📚 Upgrade Draft Rules</Link></h4>
                <h6 className="Home-Footer text-center">upgrade.cards is created and run by <a href="https://zmknox.com/">@zmknox</a>. You can find this project's code <a href="https://github.com/zmknox/draft-cards">on GitHub</a>. Some content and images are Copyright © 2014-2022 Relay FM, and are used with permission.</h6>
            </Container>
        );
    }
}

export default Landing;
