import React, { Component } from 'react';
import './DraftCard.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Image, Jumbotron, Button } from 'react-bootstrap';

export default class DraftCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            card: require(`./cards/${props.card}.json`)
        }
        this.resetCard = this.resetCard.bind(this);
        this.resetButton = this.resetButton.bind(this);
        this.calculateTotals = this.calculateTotals.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.calculateWagerSectionWinner = this.calculateWagerSectionWinner.bind(this);
        this.makeCell = this.makeCell.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.setResults = this.setResults.bind(this);
        let sections = [];
        let sectionScores = [];
        let sectionTotals = []
        for (let section of this.state.card.sections) {
            let entries = [];
            let sectionScore = [];
            let sectionTotal = [];
            let i = 0;
            for (let entry of section.entries) {
                let cells = [];
                for (let _ of entry) {
                    cells.push('undecided');
                    // TODO in future: Potentially default to known results
                }
                entries.push(cells);
                if (i === 0) {
                    for (let contestant of this.state.card.contestants) {
                        sectionScore.push(0);
                        sectionTotal.push(0);
                    }
                    // if (sectionScore.length === 1) {
                    //     sectionScore.push(-99999999);
                    // }
                }
                i += 1;
            }
            sections.push(entries);
            sectionScores.push(sectionScore);
            sectionTotals.push(sectionTotal);
        }
        this.state.dropColumn = this.state.card.contestants.length === 2;
        this.state.sections = sections;
        this.state.sectionScores = sectionScores;
        this.state.sectionTotals = sectionTotals;

        let totals = [];
        for (let _ of this.state.card.contestants) {
            totals.push(0);
        }
        this.state.totals = totals;
    }

    calculateTotals(contestantIndex) {
        let total = 0;
        for (let section of this.state.sectionTotals) {
            total += section[contestantIndex];
        }
        return total;
    }

    resetCard() {
        let sections = [];
        let sectionScores = [];
        let sectionTotals = []
        for (let section of this.state.card.sections) {
            let entries = [];
            let sectionScore = [];
            let sectionTotal = [];
            let i = 0;
            for (let entry of section.entries) {
                let cells = [];
                for (let _ of entry) {
                    cells.push('undecided');
                    // TODO in future: Potentially default to known results
                }
                entries.push(cells);
                if (i === 0) {
                    for (let contestant of this.state.card.contestants) {
                        sectionScore.push(0);
                        sectionTotal.push(0);
                    }
                    // if (sectionScore.length === 1) {
                    //     sectionScore.push(-99999999);
                    // }
                }
                i += 1;
            }
            sections.push(entries);
            sectionScores.push(sectionScore);
            sectionTotals.push(sectionTotal);
        }

        return {
            sections,
            sectionScores,
            sectionTotals
        };
    }

    resetButton() {
        const newState = this.resetCard();
        this.setState(newState);
    }

    handleSelection(sectionIndex, entryIndex, cellIndex, graded, wager) {
        const currentState = this.state.sections[sectionIndex][entryIndex][cellIndex];
        let newState;
        let totals = this.state.totals;
        let sectionScores = this.state.sectionScores;
        let sectionTotals = this.state.sectionTotals;
        let contestantIndex = cellIndex;
        if (cellIndex === 2 && this.state.dropColumn) {
            contestantIndex = 1
        }

        switch(currentState) {
            case 'undecided':
                newState = 'correct';
                switch (graded) {
                    case 'wager':
                        sectionScores[sectionIndex][contestantIndex] += wager;
                        sectionTotals = this.calculateWagerSectionWinner(sectionIndex);
                        break;
                    case true:
                        sectionTotals[sectionIndex][contestantIndex] += 1;
                        totals[cellIndex] += 1;
                        break;
                }
                break;
            case 'correct':
                newState = 'wrong';
                switch (graded) {
                    case 'wager':
                        sectionScores[sectionIndex][contestantIndex] -= wager;
                        sectionTotals = this.calculateWagerSectionWinner(sectionIndex);
                        break;
                    case true:
                        sectionTotals[sectionIndex][contestantIndex] -= 1;
                        totals[cellIndex] -= 1;
                        break;
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
            sectionScores: sectionScores,
            sectionTotals: sectionTotals,
            totals: totals
        });
        return this.state;
    }

    calculateWagerSectionWinner(sectionIndex) {
        let sectionScores = this.state.sectionScores;
        let sectionTotals = this.state.sectionTotals;

        let highest = undefined;
        let highestIndex = [];
        let totals = [];
        let foundNonZero = false; // if everyone is zero, nobody gets points
        for(let contestantIndex in sectionScores[sectionIndex]) {
            totals.push(0)
            if (highest == undefined || sectionScores[sectionIndex][contestantIndex] > highest) {
                highest = sectionScores[sectionIndex][contestantIndex];
                highestIndex = [contestantIndex];
            } else if (sectionScores[sectionIndex][contestantIndex] == highest) {
                highestIndex.push(contestantIndex);
            }
            if (sectionScores[sectionIndex][contestantIndex] !== 0) {
                foundNonZero = true;
            }
        }
        if (foundNonZero) {
            for (let index of highestIndex) {
                totals[index] = 1;
            }
        }
        sectionTotals[sectionIndex] = totals;

        return sectionTotals;
    }

    setResults() {
        let newState = this.resetCard();
        this.setState(newState, () => {
            for (let sectionIndex in this.state.card.sections) {
                let section = this.state.card.sections[sectionIndex];
                for (let entryIndex in section.entries) {
                    const entry = section.entries[entryIndex];
                    let cells = [];
                    let index = 0; // yes this is dumb
                    for (let pick of entry) {
                        if (pick.correct) {
                            this.handleSelection(sectionIndex, entryIndex, index, section.graded, pick.wager);
                        } else {
                            // incorrect is just pushing up the state machine twice
                            // undecided -> correct -> wrong
                            this.handleSelection(sectionIndex, entryIndex, index, section.graded, pick.wager);
                            this.handleSelection(sectionIndex, entryIndex, index, section.graded, pick.wager);
                        }
                        index += 1;
                    }
                }
            }
        });
    }

    makeCell(pick, sectionIndex, entryIndex, cellIndex, graded) {
        let cellState = 'white-cell';
        if (this.state.sections[sectionIndex][entryIndex][cellIndex] === 'correct') {
            cellState = 'blue-cell';
        } else if (this.state.sections[sectionIndex][entryIndex][cellIndex] === 'wrong') {
            cellState = 'red-cell';
        }
        let colVal = 5;
        if (this.state.card.contestants.length != 2) {
            colVal = 12 / this.state.card.contestants.length;
        } else if (graded == 'wager') {
            colVal = 3;
        }
        return (
            <th onClick={() => this.handleSelection(sectionIndex, entryIndex, cellIndex, graded, pick.wager ?? 0)} className={cellState + " col-" + colVal + " text-center"}>{pick.pick}</th>
        )
    }

    renderButton() {
        if (this.state.card.finished === true) {
            return (
                <>
                    <Row className="justify-content-center">
                        <Col bsPrefix="col-">
                            <Button onClick={this.setResults} size="lg" variant="dark">View Official Rulings</Button>
                        </Col>
                    </Row>
                </>
            )
        }
        return <></>
    }

    renderSection(section, round, sectionIndex) {
        let collapse = `${this.state.card.contestants.length}`;
        if (collapse == '2') {
            collapse = '3'
        }
        return (
            <>
                {section.name ? 
                    (
                        <tr className="d-flex">
                            <th colSpan={collapse} className="col-12 text-center row-heading">
                                <h5>{section.link ? <a href={section.link}>{section.name}</a> : section.name}</h5>
                            </th>
                        </tr>
                    ) : ''
                }
                {section.entries.map((row, rowIndex) => {
                    return (
                        <tr className="d-flex">
                            {row.map((pick, pickIndex) => {
                                if (pickIndex == 1 && row.length == 2) {
                                    let colVal = 2;
                                    if (section.graded == 'wager') {
                                        colVal = 6;
                                    }
                                    const label = Array.isArray(section.roundLabel) ? 
                                        section.roundLabel[rowIndex] ?? round++ :
                                        section.roundLabel ?? round++;
                                    
                                    return (
                                        <>
                                            <th className={`white-cell col-${colVal} text-center row-th`}>
                                                {section.graded == 'wager' ? label :
                                                    <h3>{label}</h3>
                                                }
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
                    {this.renderButton()}
                    <br />
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
                                            } else if (this.state.card.contestants.length == 3) {
                                                col = 'col-4';
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
                                        if(section.graded !== false) {
                                            let currentRound = round;
                                            round += section.entries.length;
                                            return this.renderSection(section, currentRound, sectionIndex);
                                        } else return <></>
                                    })}

                                    <tr className="d-flex">
                                        {this.state.card.contestants.map((contestant, contestantIndex) => {
                                            let colVal = 5;
                                            if (this.state.card.contestants.length != 2) {
                                                colVal = 12 / this.state.card.contestants.length;
                                            }
                                            const returning = [];
                                            if (contestantIndex == 1 && this.state.card.contestants.length == 2) {
                                                returning.push(<th className="col-2 text-center row-th total-cell">
                                                    <h3>Total</h3>
                                                </th>);
                                            }
                                            returning.push(<th className={"col-" + colVal + " text-center total-cell"}>
                                                <h3>{this.calculateTotals(contestantIndex)}</h3>
                                            </th>)
                                            return returning;
                                        })}
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
                    {this.state.card.footnote !== undefined ? 
                        <>
                            <br />
                            <Row>
                                <Col>
                                    <h4 className="text-center">{this.state.card.footnote}</h4>
                                </Col>
                            </Row>
                        </> : ''
                    }
                    <Row className="justify-content-center">
                        <Col bsPrefix="col-">
                            <Button onClick={this.resetButton} variant="dark">Reset Picks</Button>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <h5 className="text-center">Content based on <a id="footer-url" href={this.state.card.link}>{this.state.card.linkText}</a>. Interactive scorecard by <a href="https://snailedit.social/@zmk">zmknox</a>.</h5>
                        </Col>
                    </Row>
                </Container>
            </>
            
        );
    }
}
