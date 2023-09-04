import React, { Component } from 'react';
import { Badge, Card, CardColumns, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Landing.css'
import cardIndex from './card-index.json';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.renderCardLinks = this.renderCardLinks.bind(this);
        this.renderSingleCard = this.renderSingleCard.bind(this);
    }

    renderSingleCard(card) {
        return <Col sm={6}>
            <Link to={`/card/${card.card}`} >
                <Card className="Home-Card">
                    <Card.Img className="Home-Card-Img" variant="top" src={card.img} />
                    <Card.Body>
                        <Card.Title>{card.name}</Card.Title>
                        <Card.Text>{card.tags.includes('active') ? <Badge pill variant='info'>Active</Badge> : ''} {card.date}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>;
    }

    renderCardLinks() {
        let arr = [];
        for (let card of cardIndex.cards) {
            if (arr.length >= 4) {
                break;
            }
            if (card.tags.includes('active')) {
                arr.push(this.renderSingleCard(card));
            }
        }
        for (let card of cardIndex.cards) {
            if (arr.length >= 4) {
                break;
            }
            if (!card.tags.includes('active')) {
                arr.push(this.renderSingleCard(card));
            }
        }
        return arr;
    }

    render() {
        return (
            <Container className='justify-content-center'>
                <Image className='Hero-Image text-center' src='/img/draft-shield.png' fluid />
                <h3 className="Home-Heading text-center">Recent Drafts</h3>
                <Row>
                    {this.renderCardLinks()}
                </Row>
                <h4 className="Home-Bottom-Link text-center"><Link to={`/cards/`}>⬅️ View All Scorecards</Link></h4>
                <h4 className="Home-Bottom-Link text-center"><Link to={`/tags/`}>📛 View By Tag</Link></h4>
                <h4 className="Home-Bottom-Link text-center"><Link to={`/rules/`}>📚 Upgrade Draft Rules</Link></h4>
                <h6 className="Home-Footer text-center">upgrade.cards is created and run by <a href="https://zmknox.com/">zmknox</a>. You can find this project's code <a href="https://github.com/zmknox/draft-cards">on GitHub</a>. Some content and images are Copyright © 2014-2023 Relay FM, and are used with permission.</h6>
            </Container>
        );
    }
}

export default Landing;
