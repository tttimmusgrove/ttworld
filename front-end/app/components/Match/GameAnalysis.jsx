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
            slideIndex: 0
        }

        this.createShotCharts = this.createShotCharts.bind(this);
        this.createShotTypeCharts = this.createShotTypeCharts.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }
    componentDidMount() {
        var gameAnswers = this.state.gameAnswers;

        this.createShotCharts(gameAnswers);
        this.createShotTypeCharts(gameAnswers);
    }
    createShotCharts(gameAnswers) {
        var winningShots = [];
        var winningShotsObject = [{
            label: 'Serve', value: 0
        }, {
            label: 'Serve Return', value: 0
        }, {
            label: '3rd Ball', value: 0
        }, {
            label: '4th Ball', value: 0
        }, {
            label: '5th Ball', value: 0
        }, {
            label: '6th Ball or Greater', value: 0
        }];
        var winningShotsObjectFinal = [];

        var losingShots = [];
        var losingShotsObject = [{
            label: 'Serve', value: 0
        }, {
            label: 'Serve Return', value: 0
        }, {
            label: '3rd Ball', value: 0
        }, {
            label: '4th Ball', value: 0
        }, {
            label: '5th Ball', value: 0
        }, {
            label: '6th Ball or Greater', value: 0
        }];
        var losingShotsObjectFinal = [];

        gameAnswers.points.forEach((point) => {
            if(point[0] == 0 && point[1] != undefined) {
                winningShots.push(point[1])
            } else if(point[0] == 1 && point[1] != undefined) {
                losingShots.push(point[1])
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
            winningShotsObjectFinal[i].value = winningShotsObjectFinal[i].value/winningShots.length*100
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
            losingShotsObjectFinal[i].value = losingShotsObjectFinal[i].value/losingShots.length*100
        }

        this.setState({
            winningShotsChartObject: winningShotsObjectFinal,
            losingShotsChartObject: losingShotsObjectFinal
        })
    }
    createShotTypeCharts(gameAnswers) {
        var winningShots = [];
        var winningShotsObject = [{
            label: 'Serve', value: 0
        }, {
            label: 'Serve Return', value: 0
        }, {
            label: 'Loop', value: 0
        }, {
            label: 'Smash', value: 0
        }, {
            label: 'Chop', value: 0
        }, {
            label: 'Lob', value: 0
        }, {
            label: 'Fish', value: 0
        }];
        var winningShotsObjectFinal = [];

        var losingShots = [];
        var losingShotsObject = [{
            label: 'Serve', value: 0
        }, {
            label: 'Serve Return', value: 0
        }, {
            label: 'Loop', value: 0
        }, {
            label: 'Smash', value: 0
        }, {
            label: 'Chop', value: 0
        }, {
            label: 'Lob', value: 0
        }, {
            label: 'Fish', value: 0
        }];
        var losingShotsObjectFinal = [];

        gameAnswers.points.forEach((point) => {
            if(point[0] == 0 && point[3] != undefined) {
                winningShots.push(point[3])
            } else if(point[0] == 1 && point[3] != undefined) {
                losingShots.push(point[3])
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
            winningShotsObjectFinal[i].value = winningShotsObjectFinal[i].value/winningShots.length*100
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
            losingShotsObjectFinal[i].value = losingShotsObjectFinal[i].value/losingShots.length*100
        }

        this.setState({
            winningShotTypeChartObject: winningShotsObjectFinal,
            losingShotTypeChartObject: losingShotsObjectFinal
        })
    }
    handleTabChange(value) {
        this.setState({
            slideIndex: value
        })
    }
    render() {
        var {winningShotsChartObject, losingShotsChartObject, winningShotTypeChartObject, losingShotTypeChartObject, slideIndex} = this.state;

        const renderChartTabs = () => {
            var finalJSX = [];
            var tabValue = 0;

            if(winningShotsChartObject.length > 0) {
                finalJSX.push(
                    <Tab label="Winning Shots" value={tabValue} >
                        {renderWinningShotsChart()}
                    </Tab>
                )
                tabValue++;
            }
            if(losingShotsChartObject.length > 0) {
                finalJSX.push(
                    <Tab label="Losing Shots" value={tabValue} >
                        {renderLosingShotsChart()}
                    </Tab>
                )
                tabValue++;
            }
            if(winningShotTypeChartObject.length > 0) {
                finalJSX.push(
                    <Tab label="Winning Shot Types" value={tabValue} >
                        {renderWinningShotTypeChart()}
                    </Tab>
                )
                tabValue++;
            }
            if(losingShotTypeChartObject.length > 0) {
                finalJSX.push(
                    <Tab label="Losing Shot Types" value={tabValue} >
                        {renderLosingShotTypeChart()}
                    </Tab>
                )
                tabValue++;
            }
            finalJSX.push(
                <Tab label="Suggestions" value={tabValue} >
                    <div>
                        <p>Here are some suggestions to improve next game</p>
                    </div>
                </Tab>
            )

            return finalJSX;
        }

        const renderWinningShotsChart = () => {
            if(winningShotsChartObject.length > 0) {
                return (
                    <PieChart
                      data={winningShotsChartObject}
                      width={300}
                      height={300}
                      radius={100}
                      innerRadius={20}
                    />
                )
            }
        }

        const renderLosingShotsChart = () => {
            if(losingShotsChartObject.length > 0) {
                return (
                    <PieChart
                      data={losingShotsChartObject}
                      width={300}
                      height={300}
                      radius={100}
                      innerRadius={20}
                    />
                )
            }
        }

        const renderWinningShotTypeChart = () => {
            if(winningShotTypeChartObject.length > 0) {
                return (
                    <PieChart
                      data={winningShotTypeChartObject}
                      width={300}
                      height={300}
                      radius={100}
                      innerRadius={20}
                    />
                )
            }
        }

        const renderLosingShotTypeChart = () => {
            if(losingShotTypeChartObject.length > 0) {
                return (
                    <PieChart
                      data={losingShotTypeChartObject}
                      width={300}
                      height={300}
                      radius={100}
                      innerRadius={20}
                    />
                )
            }
        }

        return (
            <div className="game-analysis">
                <Tabs
                  onChange={this.handleTabChange}
                  value={slideIndex}
                >
                    {renderChartTabs()}
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
