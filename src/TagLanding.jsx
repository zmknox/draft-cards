import React, { Component } from 'react';
import { Card, CardColumns, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TagLanding.css'
import {default as tagIndex} from './tag-index.json';

class TagLanding extends Component {
    constructor(props) {
        super(props);
        this.renderTagLinks = this.renderTagLinks.bind(this);
    }

    renderTagLinks() {
        let arr = [];
        for (let tag in tagIndex) {
            arr.push(
                <Col xs={12}>
                    <Link to={`/tag/${tag}`} >
                        <Card className="Tag-Landing-Card">
                            <Card.Body>
                                <Card.Title className="Tag-Landing-Card-Name">{tagIndex[tag].name}</Card.Title>
                                <Card.Text>{tagIndex[tag].description}</Card.Text>
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
                <h3 className="Tag-Landing-Heading text-center">Tag Index</h3>
                <Row>
                    {this.renderTagLinks()}
                </Row>
                <h3 className="Tag-Landing-Footer text-center">Want to compare two tags? Visit /compare/tag1/tag2!</h3>
            </Container>
        );
    }
}

export default TagLanding;
