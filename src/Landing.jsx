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
                <br />
                <h5 className="text-center"><a href="https://zachknox.com/bingo/drafts/">⬅ View Legacy Draft Scorecards</a></h5>
                <br /><br />
                <h6 className="text-center">upgrade.cards is created and run by <a href="https://zachknox.com/">Zach Knox</a>. You can find this project's code <a href="https://github.com/zmknox/draft-cards">on GitHub</a>. Some content and images are Copyright © 2014-2021 Relay FM, and are used with permission.</h6>
            </Container>
        );
    }
}

export default Landing;
