import React from 'react';

import {connect} from 'react-redux';
import {matchActions} from 'actions';

import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';

import {PieChart} from 'react-d3';
var BarChart = require('react-d3/barchart').BarChart;

class MatchAnalysis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerInformation: this.props.match.playerInformation,
            scores: this.props.match.scores,
            matchAnswers: this.props.match.questionAnswers,
            winningShotsChartObject: [],
            losingShotsChartObject: [],
            winningShotTypeChartObject: [],
            losingShotTypeChartObject: [],
            winningShotSideChartObject: [],
            losingShotSideChartObject: [],
            winningShotPracticedChartObject: [],
            losingShotPracticedChartObject: [],
            effortChartObject: [],
            techniqueChartObject: [],
            emotionsChartObject: [],
            tabIndex: 0,
            innerTabIndex: 0
        }

        this.createPieChartObjects = this.createPieChartObjects.bind(this);
        this.setChart = this.setChart.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleInnerTabChange = this.handleInnerTabChange.bind(this);
    }
    componentDidMount() {
        var matchAnswers = this.state.matchAnswers;

        var shotsLabels = ['Serve', 'Serve Return', '3rd Ball', '4th Ball', '5th Ball', '6th Ball or Greater'];
        var shotTypeLabels = ['Serve', 'Serve Return', 'Loop', 'Smash', 'Chop', 'Lob', 'Fish'];
        var shotSideLabels = ['Backhand', 'Forehand'];
        var practicedLabels = ['Practiced', 'Improvised'];
        var starLabels = ['1', '2', '3', '4', '5'];
        var emotionsLabels = ['0.00', '0.25', '0.50', '0.75', '1.00'];

        this.createPieChartObjects(matchAnswers, shotsLabels, 1, 1);
        this.createPieChartObjects(matchAnswers, shotTypeLabels, 3, 2);
        this.createPieChartObjects(matchAnswers, shotSideLabels, 4, 3);
        this.createPieChartObjects(matchAnswers, practicedLabels, 7, 4);
        this.createBarChartObjects(matchAnswers, starLabels, 8, 5);
        this.createBarChartObjects(matchAnswers, starLabels, 9, 6);
        this.createBarChartObjects(matchAnswers, emotionsLabels, 10, 7);
    }
    createPieChartObjects(matchAnswers, labels, relatedQuestion, chartNumber) {
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

        matchAnswers.forEach((game) => {
            game.points.forEach((point) => {
                if(point[0] == 0 && point[relatedQuestion] != undefined) {
                    winningShots.push(point[relatedQuestion])
                } else if(point[0] == 1 && point[relatedQuestion] != undefined) {
                    losingShots.push(point[relatedQuestion])
                }
            });
        })

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
    createBarChartObjects(matchAnswers, labels, relatedQuestion, chartNumber) {
        var shots = [];
        var shotsObject = [{
            name: "Series A",
            values: []
        }];
        for(let i = 0; i<labels.length; i++) {
            shotsObject[0].values.push(
                { "x": labels[i], "y":  0}
            )
        }
        var shotsObjectFinal = [];

        matchAnswers.forEach((game) => {
            game.points.forEach((point) => {
                if(point[relatedQuestion] != undefined) {
                    shots.push(point[relatedQuestion])
                }
            });
        })

        shots.forEach((shot) => {
            if(shot != undefined) {
                if(chartNumber != 7) {
                    shotsObject[0].values[shot].y++;
                } else {
                    if (shot == 0) {
                        shotsObject[0].values[0].y++;
                    } else if (shot == 0.25) {
                        shotsObject[0].values[1].y++;
                    } else if (shot == 0.5) {
                        shotsObject[0].values[2].y++;
                    } else if (shot == 0.75) {
                        shotsObject[0].values[3].y++;
                    } else if (shot == 1) {
                        shotsObject[0].values[4].y++;
                    }
                }
            }
        })

        for(let i = 0; i<shotsObject.length; i++) {
            shotsObjectFinal.push(shotsObject[i]);
        }

        this.setChart(chartNumber, shotsObjectFinal);
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
        } else if (chartNumber == 5) {
            this.setState({
                effortChartObject: winningShotsObjectFinal
            })
        } else if (chartNumber == 6) {
            this.setState({
                techniqueChartObject: winningShotsObjectFinal
            })
        } else if (chartNumber == 7) {
            this.setState({
                emotionsChartObject: winningShotsObjectFinal
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
        var {winningShotsChartObject, losingShotsChartObject, winningShotTypeChartObject, losingShotTypeChartObject, winningShotSideChartObject, losingShotSideChartObject, winningShotPracticedChartObject, losingShotPracticedChartObject, effortChartObject, techniqueChartObject, emotionsChartObject, tabIndex, innerTabIndex} = this.state;

        var outerTabIndex = 0;

        const renderInnerTabsPie = (winningChartObject, losingChartObject, chartLabels) => {
            var tabValue = 0;
            return (
                <Tabs
                    onChange={this.handleInnerTabChange}
                    value={innerTabIndex}
                >
                    {renderInnerTabPie(winningChartObject, chartLabels[0], tabValue++)}
                    {renderInnerTabPie(losingChartObject, chartLabels[1], tabValue++)}
                </Tabs>
            )
        }

        const renderInnerTabsBar = (effortChartObject, techniqueChartObject, emotionChartObject, chartLabels) => {
            var tabValue = 0;
            return (
                <Tabs
                    onChange={this.handleInnerTabChange}
                    value={innerTabIndex}
                >
                    {renderInnerTabBar(effortChartObject, chartLabels[0], tabValue++)}
                    {renderInnerTabBar(techniqueChartObject, chartLabels[1], tabValue++)}
                    {renderInnerTabBar(emotionChartObject, chartLabels[2], tabValue++)}
                </Tabs>
            )
        }

        const renderInnerTabPie = (chartObject, chartLabel, tabValue) => {
            if(chartObject.length > 0 && chartLabel != undefined) {
                return (
                    <Tab label={chartLabel} value={tabValue} >
                        {renderPieChart(chartObject)}
                    </Tab>
                )
            }
        }

        const renderInnerTabBar = (chartObject, chartLabel, tabValue) => {
            if(chartObject.length > 0 && chartLabel != undefined) {
                return (
                    <Tab label={chartLabel} value={tabValue} >
                        {renderBarChart(chartObject)}
                    </Tab>
                )
            }
        }

        const renderOuterTabPie = (winningChartObject, losingChartObject, outerLabel, innerLabels) => {
            if(winningChartObject.length > 0 || losingChartObject.length > 0) {
                return (
                    <Tab label={outerLabel} value={outerTabIndex++} >
                        {renderInnerTabsPie(winningChartObject, losingChartObject, innerLabels)}
                    </Tab>
                )
            }
        }

        const renderOuterTabBar = (effortChartObject, techniqueChartObject, emotionChartObject, outerLabel, innerLabels) => {
            return (
                <Tab label={outerLabel} value={outerTabIndex++} >
                    {renderInnerTabsBar(effortChartObject, techniqueChartObject, emotionChartObject, innerLabels)}
                </Tab>
            )
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

        const renderBarChart = (chartObject) => {
            if(chartObject.length > 0) {
                return (
                    <BarChart
                        data={chartObject}
                        width={500}
                        height={200}
                        fill={'#3182bd'}
                    />
                )
            }
        }

        return (
            <div className="match-analysis">
                <Tabs
                  onChange={this.handleTabChange}
                  value={tabIndex}
                >
                    {renderOuterTabPie(winningShotsChartObject, losingShotsChartObject, 'Shots', ['Winning Shots', 'Losing Shots'])}
                    {renderOuterTabPie(winningShotTypeChartObject, losingShotTypeChartObject, 'Shot Types', ['Winning Shot Types', 'Losing Shot Types'])}
                    {renderOuterTabPie(winningShotSideChartObject, losingShotSideChartObject, 'Shot Side', ['Winning Shot Sides', 'Losing Shot Sides'])}
                    {renderOuterTabPie(winningShotPracticedChartObject, losingShotPracticedChartObject, 'Practiced?', ['Winning Shot Practiced'])}
                    {renderOuterTabBar(effortChartObject, techniqueChartObject, emotionsChartObject, 'Ratings', ['Effort', 'Technique', 'Emotional State'])}
                    <Tab label="Suggestions" value={outerTabIndex} >
                        <p>Here are some suggestions to improve next match</p>
                    </Tab>
                </Tabs>
            </div>
        );
    }
};

export default connect(
    (state) => {
        return state;
    }
)(MatchAnalysis);
