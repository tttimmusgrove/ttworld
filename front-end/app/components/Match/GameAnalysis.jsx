import React from 'react';

import {connect} from 'react-redux';
import {matchActions} from 'actions';

import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';

import {PieChart} from 'react-d3';

class GameAnalysis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameAnswers: this.props.match.questionAnswers[this.props.gameInMatch-1],
            winningShotsChartObject: [],
            losingShotsChartObject: [],
            winningShotTypeChartObject: [],
            losingShotTypeChartObject: [],
            winningShotSideChartObject: [],
            losingShotSideChartObject: [],
            winningShotPracticedChartObject: [],
            losingShotPracticedChartObject: [],
            tabIndex: 0,
            innerTabIndex: 0
        }

        this.createChartObjects = this.createChartObjects.bind(this);
        this.setChart = this.setChart.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleInnerTabChange = this.handleInnerTabChange.bind(this);
    }
    componentDidMount() {
        var gameAnswers = this.state.gameAnswers;

        var shotsLabels = ['Serve', 'Serve Return', '3rd Ball', '4th Ball', '5th Ball', '6th Ball or Greater'];
        var shotTypeLabels = ['Serve', 'Serve Return', 'Loop', 'Smash', 'Chop', 'Lob', 'Fish'];
        var shotSideLabels = ['Backhand', 'Forehand'];
        var practicedLabels = ['Practiced', 'Improvised'];

        this.createChartObjects(gameAnswers, shotsLabels, 1, 1);
        this.createChartObjects(gameAnswers, shotTypeLabels, 3, 2);
        this.createChartObjects(gameAnswers, shotSideLabels, 4, 3);
        this.createChartObjects(gameAnswers, practicedLabels, 7, 4);
    }
    createChartObjects(gameAnswers, labels, relatedQuestion, chartNumber) {
        var winningShots = [];
        var winningShotsObject = [];
        var losingShots = [];
        var losingShotsObject = [];
        for(let i = 0; i<labels.length; i++) {
            winningShotsObject.push({
                label: labels[i],
                value: 0
            })
            losingShotsObject.push({
                label: labels[i],
                value: 0
            })
        }
        var winningShotsObjectFinal = [];
        var losingShotsObjectFinal = [];

        gameAnswers.points.forEach((point) => {
            if(point[0] == 0 && point[relatedQuestion] != undefined) {
                winningShots.push(point[relatedQuestion])
            } else if(point[0] == 1 && point[relatedQuestion] != undefined) {
                losingShots.push(point[relatedQuestion])
            }
        });

        winningShots.forEach((shot) => {
            winningShotsObject[shot].value++;
        })
        for(let i = 0; i<winningShotsObject.length; i++) {
            if(winningShotsObject[i].value != 0) {
                winningShotsObjectFinal.push(winningShotsObject[i]);
            }
        }
        for(let i = 0; i<winningShotsObjectFinal.length; i++) {
            winningShotsObjectFinal[i].value = Math.round(winningShotsObjectFinal[i].value/winningShots.length*100)
        }

        losingShots.forEach((shot) => {
            losingShotsObject[shot].value++;
        })
        for(let i = 0; i<losingShotsObject.length; i++) {
            if(losingShotsObject[i].value != 0) {
                losingShotsObjectFinal.push(losingShotsObject[i])
            }
        }
        for(let i = 0; i<losingShotsObjectFinal.length; i++) {
            losingShotsObjectFinal[i].value = Math.round(losingShotsObjectFinal[i].value/losingShots.length*100)
        }

        this.setChart(chartNumber, winningShotsObjectFinal, losingShotsObjectFinal);
    }
    setChart(chartNumber, winningShotsObjectFinal, losingShotsObjectFinal) {
        if(chartNumber == 1) {
            this.setState({
                winningShotsChartObject: winningShotsObjectFinal,
                losingShotsChartObject: losingShotsObjectFinal
            })
        } else if (chartNumber == 2) {
            this.setState({
                winningShotTypeChartObject: winningShotsObjectFinal,
                losingShotTypeChartObject: losingShotsObjectFinal
            })
        } else if (chartNumber == 3) {
            this.setState({
                winningShotSideChartObject: winningShotsObjectFinal,
                losingShotSideChartObject: losingShotsObjectFinal
            })
        } else if (chartNumber == 4) {
            this.setState({
                winningShotPracticedChartObject: winningShotsObjectFinal,
                losingShotPracticedChartObject: losingShotsObjectFinal
            })
        }
    }
    handleTabChange(value) {
        this.setState({
            tabIndex: value
        })
    }
    handleInnerTabChange(value) {
        this.setState({
            innerTabIndex: value
        })
    }
    render() {
        var {winningShotsChartObject, losingShotsChartObject, winningShotTypeChartObject, losingShotTypeChartObject, winningShotSideChartObject, losingShotSideChartObject, winningShotPracticedChartObject, losingShotPracticedChartObject, tabIndex, innerTabIndex} = this.state;

        var outerTabIndex = 0;

        const renderInnerTabs = (winningChartObject, losingChartObject, chartLabels) => {
            var tabValue = 0;
            return (
                <Tabs
                    onChange={this.handleInnerTabChange}
                    value={innerTabIndex}
                >
                    {renderInnerTab(winningChartObject, chartLabels[0], tabValue++)}
                    {renderInnerTab(losingChartObject, chartLabels[1], tabValue++)}
                </Tabs>
            )
        }

        const renderInnerTab = (chartObject, chartLabel, tabValue) => {
            if(chartObject.length > 0 && chartLabel != undefined) {
                return (
                    <Tab label={chartLabel} value={tabValue} >
                        {renderPieChart(chartObject)}
                    </Tab>
                )
            }
        }

        const renderOuterTab = (winningChartObject, losingChartObject, outerLabel, innerLabels) => {
            if(winningChartObject.length > 0 || losingChartObject.length > 0) {
                return (
                    <Tab label={outerLabel} value={outerTabIndex++} >
                        {renderInnerTabs(winningChartObject, losingChartObject, innerLabels)}
                    </Tab>
                )
            }
        }

        const renderPieChart = (chartObject) => {
            if(chartObject.length > 0) {
                return (
                    <PieChart
                      data={chartObject}
                      width={500}
                      height={250}
                      radius={75}
                      innerRadius={15}
                    />
                )
            }
        }

        return (
            <div className="game-analysis">
                <Tabs
                  onChange={this.handleTabChange}
                  value={tabIndex}
                >
                    {renderOuterTab(winningShotsChartObject, losingShotsChartObject, 'Shots', ['Winning Shots', 'Losing Shots'])}
                    {renderOuterTab(winningShotTypeChartObject, losingShotTypeChartObject, 'Shot Types', ['Winning Shot Types', 'Losing Shot Types'])}
                    {renderOuterTab(winningShotSideChartObject, losingShotSideChartObject, 'Shot Side', ['Winning Shot Sides', 'Losing Shot Sides'])}
                    {renderOuterTab(winningShotPracticedChartObject, losingShotPracticedChartObject, 'Practiced?', ['Winning Shot Practiced'])}
                    <Tab label="Suggestions" value={outerTabIndex} >
                        <p>Here are some suggestions to improve next game</p>
                    </Tab>
                </Tabs>
                <RaisedButton className="next-game-button" label="Start Next Game" primary={true} fullWidth={true} onClick={this.props.nextGame} />
            </div>
        );
    }
};

export default connect(
    (state) => {
        return state;
    }
)(GameAnalysis);
