import React, { Component } from 'react';
import './DraftCard.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Image, Jumbotron } from 'react-bootstrap';

export default class DraftCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            card: require(`./cards/${props.card}.json`)
        }
        this.handleSelection = this.handleSelection.bind(this);
        this.makeCell = this.makeCell.bind(this);
        let sections = [];
        for (let section of this.state.card.sections) {
            let entries = [];
            for (let entry of section.entries) {
                let cells = [];
                for (let _ of entry) {
                    cells.push('undecided');
                    // TODO in future: Potentially default to known results
                }
                entries.push(cells);
            }
            sections.push(entries);
        }
        this.state.sections = sections;

        let totals = [];
        for (let _ of this.state.card.contestants) {
            totals.push(0);
        }
        this.state.totals = totals;
    }

    handleSelection(sectionIndex, entryIndex, cellIndex, graded) {
        const currentState = this.state.sections[sectionIndex][entryIndex][cellIndex];
        let newState;
        let totals = this.state.totals;

        switch(currentState) {
            case 'undecided':
                newState = 'correct';
                if (graded === true) {
                    totals[cellIndex] += 1;
                }
                break;
            case 'correct':
                newState = 'wrong';
                if (graded === true) {
                    totals[cellIndex] -= 1;
                }
                break;
            case 'wrong': 
                newState = 'undecided';
                break;
            default:
                newState = 'wrong';
                break;
        }
        let sections = this.state.sections;
        sections[sectionIndex][entryIndex][cellIndex] = newState;
        
        
        this.setState({
            sections: sections,
            totals: totals
        });

    }

    makeCell(pick, sectionIndex, entryIndex, cellIndex, graded) {
        let cellState = 'white-cell';
        if (this.state.sections[sectionIndex][entryIndex][cellIndex] === 'correct') {
            cellState = 'blue-cell';
        } else if (this.state.sections[sectionIndex][entryIndex][cellIndex] === 'wrong') {
            cellState = 'red-cell';
        }
        return (
            <th onClick={() => this.handleSelection(sectionIndex, entryIndex, cellIndex, graded)} className={cellState + " col-5 text-center"}>{pick.pick}</th>
        )
    }

    renderSection(section, round, sectionIndex) {
        let collapse = `${this.state.card.contestants.length}`;
        if (collapse == '2') {
            collapse = '3'
        }
        return (
            <>
                <tr className="d-flex">
                    <th colSpan={collapse} className="col-12 text-center row-heading">
                        <h5>{section.name}</h5>
                    </th>
                </tr>
                {section.entries.map((row, rowIndex) => {
                    return (
                        <tr className="d-flex">
                            {row.map((pick, pickIndex) => {
                                if (pickIndex == 1 && row.length == 2) {
                                    return (
                                        <>
                                            <th className="col-2 text-center row-th">
                                                <h3>{section.roundLabel ?? round++}</h3>
                                            </th>
                                            {this.makeCell(pick, sectionIndex, rowIndex, pickIndex, section.graded)}
                                        </>
                                    )
                                }
                                return this.makeCell(pick, sectionIndex, rowIndex, pickIndex, section.graded)
                            })}
                        </tr>
                    )
                })}
            </>
        );
    }

    render() {
        let round = 1;
        let collapse = `${this.state.card.contestants.length}`;
        if (collapse == '2') {
            collapse = '3'
        }
        return (
            <>
                <Jumbotron fluid className="jumbotron-padding header-bg">
                    <Container className="justify-content-center text-center">
                        <h1 className="white-header bold-header">{this.state.card.name}</h1>
                        <h3 className="white-header">{this.state.card.preLinkText}<a className='white-header' href={this.state.card.link}>{this.state.card.linkText}</a></h3>
                    </Container>
                </Jumbotron>
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col>
                            <h5>Select each entry to award points, or mark them wrong.</h5>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md="12" lg="10">
                            <Table bordered>
                                <tbody>
                                    <tr className="d-flex">
                                        {this.state.card.contestants.map((contestant, cIndex) => {
                                            let col = 'col-6';
                                            if (this.state.card.contestants.length == 2) {
                                                col = 'col-5';
                                                if (cIndex == 1) {
                                                    return (
                                                        <>
                                                            <th className="col-2 text-center row-th">
                                                                <br />
                                                                <br />
                                                                <h3>Round</h3>
                                                            </th>
                                                            <th className={col + ' text-center'}>
                                                                <a href={contestant.link}>
                                                                    <h3>{contestant.name}</h3>
                                                                    <Image className="ContestantIcon mx-auto" src={contestant.icon} />
                                                                </a>
                                                            </th>
                                                        </>
                                                    )
                                                }
                                            }
                                            return (
                                                <th className={col + ' text-center'}>
                                                    <a href={contestant.link}>
                                                        <h3>{contestant.name}</h3>
                                                        <Image className="ContestantIcon mx-auto" src={contestant.icon} />
                                                    </a>
                                                </th>
                                            )
                                        })}
                                    </tr>
                                    {this.state.card.sections.map((section, sectionIndex) => {
                                        if(section.graded === true) {
                                            let currentRound = round;
                                            round += section.entries.length;
                                            return this.renderSection(section, currentRound, sectionIndex);
                                        } else return <></>
                                    })}

                                    <tr className="d-flex">
                                        <th className="col-5 text-center">
                                            <h3>{this.state.totals[0]}</h3>
                                        </th>
                                        <th className="col-2 text-center row-th">
                                            <h3>Total</h3>
                                        </th>
                                        <th className="col-5 text-center">
                                            <h3>{this.state.totals[1]}</h3>
                                        </th>
                                    </tr>

                                    {this.state.card.sections.map((section, sectionIndex) => {
                                        if (section.graded === false) {
                                            let currentRound = round;
                                            round += section.entries.length;
                                            return this.renderSection(section, currentRound, sectionIndex);
                                        } else return <></>
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <h5 className="text-center">Content based on <a id="footer-url" href={this.state.card.link}>{this.state.card.linkText}</a>. Interactive scorecard by <a href="https://twitter.com/zmknox">Zach Knox</a>.</h5>
                        </Col>
                    </Row>
                </Container>
            </>
            
        );
    }
}