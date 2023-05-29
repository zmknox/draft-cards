import React, { Component } from 'react';
import { Card, CardColumns, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Tag.css'
import {default as cardIndex} from './card-index.json';
import {default as tagIndex} from './tag-index.json';

class Tag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tag: props.tag
        };

        this.renderCardLinks = this.renderCardLinks.bind(this);
    }

    renderCardLinks() {
        let arr = [];
        for (let card of cardIndex.cards) {
            if (card.tags.includes(this.state.tag)) {
                arr.push(
                    <Col sm={6}>
                        <Link to={`/card/${card.card}`} >
                            <Card className="Tag-Card">
                                <Card.Img className="Tag-Card-Img" variant="top" src={card.img} />
                                <Card.Body>
                                    <Card.Title>{card.name}</Card.Title>
                                    <Card.Text>{card.date}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )
            }
        }

        return arr;
    }

    render() {
        const tagInfo = tagIndex[this.state.tag];
        return (
            <Container className='justify-content-center'>
                <h6 className="Tag-Heading text-center">Scorecard Tag</h6>
                <h1 className="Tag-Name text-center">{tagInfo.name}</h1>
                <h3 className="Tag-Description text-center">{tagInfo.description}</h3>
                <Row>
                    {this.renderCardLinks(this.props.tag)}
                </Row>
                <h4 className="Tag-Bottom-Link text-center"><Link to={`/tags/`}>⬅️ View All Tags</Link></h4>
            </Container>
        );
    }
}

export default Tag;
