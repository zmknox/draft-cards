import React, { Component } from 'react';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Tag.css'
import {default as cardIndex} from './card-index.json';
import {default as tagIndex} from './tag-index.json';

class TagCompare extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tag: props.tag,
            compared: props.compared
        };

        this.renderCardLinks = this.renderCardLinks.bind(this);
    }

    renderCardLinks() {
        let arr = [];
        for (let card of cardIndex.cards) {
            if (card.tags.includes(this.state.tag) && card.tags.includes(this.state.compared)) {
                arr.push(
                    <Col sm={6}>
                        <Link to={`/card/${card.card}`} >
                            <Card className="Tag-Card">
                                <Card.Img className="Tag-Card-Img" variant="top" src={card.img} />
                                <Card.Body>
                                    <Card.Title>{card.name}</Card.Title>
                                    <Card.Text>{card.tags.includes('active') ? <Badge pill variant='info'>Active</Badge> : ''} {card.date}</Card.Text>
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
        const comparedInfo = tagIndex[this.state.compared];
        return (
            <Container className='justify-content-center'>
                <h6 className="Tag-Heading text-center">Scorecard Tags</h6>
                <h1 className="Tag-Name text-center">{tagInfo.name} and {comparedInfo.name}</h1>
                <h3 className="Tag-Description text-center">{tagInfo.description} and {comparedInfo.description}</h3>
                <Row>
                    {this.renderCardLinks(this.props.tag)}
                </Row>
                <h4 className="Tag-Bottom-Link text-center"><Link to={`/tags/`}>⬅️ View All Tags</Link></h4>
            </Container>
        );
    }
}

export default TagCompare;
