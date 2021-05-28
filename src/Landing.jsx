import React, { Component } from 'react';
import { Container, Image } from 'react-bootstrap';
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
                <Link to={`/card/${card.card}`} >
                    <h2 className='text-center'>{card.name}</h2>
                </Link>
            )
        }

        return arr;
    }

    render() {
        return (
            <Container className='justify-content-center'>
                <Image className='Hero-Image text-center' src='/img/draft-shield.png' fluid />

                {this.renderCardLinks()}
            </Container>
        );
    }
}

export default Landing;
