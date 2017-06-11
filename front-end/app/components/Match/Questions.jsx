import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import Snackbar from 'material-ui/Snackbar';

import questions from '../../api/questions';

class Questions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            questions: questions,
            sliderValue: 0.5,
            sliderDescription: "Balanced",
            selectedStarNumber: 0,
            pointWinner: 1,
            gamePoint: 0,
            nextPointIndication: false
        }

        this.incrementStep = this.incrementStep.bind(this);
        this.incrementStepSimple = this.incrementStepSimple.bind(this);
        this.incrementStepBasic = this.incrementStepBasic.bind(this);
        this.handleSliderValue = this.handleSliderValue.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.resetPoint && nextProps.resetPoint != this.props.resetPoint) {
            this.setState({
                step: 0
            })
        }
    }
    incrementStep(questionAnswer) {
        var step = this.state.step;
        var gamePoint = this.state.gamePoint;
        if(step === 8 || step === 9) {
            this.setState({
                selectedStarNumber: questionAnswer+1
            })
            setTimeout(() => {
                this.setState({
                    step: ++step,
                    selectedStarNumber: 0
                })
            }, 300)
        } else if (step === 10) {
            this.props.nextPoint(this.state.pointWinner, ++this.state.gamePoint);
            this.setState({
                nextPointIndication: true
            })
            setTimeout(() => {
                this.setState({
                    step: 0,
                    gamePoint: ++gamePoint,
                    nextPointIndication: false
                })
            }, 300)
        } else if (step == 0) {
            this.setState({
                step: ++step,
                pointWinner: questionAnswer
            })
        } else {
            this.setState({
                step: ++step
            })
        }
    }
    incrementStepSimple(questionAnswer) {
        var step = this.state.step;
        var gamePoint = this.state.gamePoint;
        if (step === 6) {
            this.props.nextPoint(this.state.pointWinner, ++this.state.gamePoint);
            this.setState({
                nextPointIndication: true
            })
            setTimeout(() => {
                this.setState({
                    step: 0,
                    gamePoint: ++gamePoint,
                    nextPointIndication: false
                })
            }, 300)
        } else if (step == 0) {
            this.setState({
                step: ++step,
                pointWinner: questionAnswer
            })
        } else {
            this.setState({
                step: ++step
            })
        }
    }
    incrementStepBasic(questionAnswer) {
        var step = this.state.step;
        var gamePoint = this.state.gamePoint;

        this.props.nextPoint(questionAnswer, ++this.state.gamePoint);
        this.setState({
            gamePoint: ++gamePoint
        })
    }
    handleSliderValue(event, value) {
        var sliderDescription = "";
        if(value === 0) {
            sliderDescription = "Shutdown";
        } else if (value === 0.25) {
            sliderDescription = "Understimulated";
        } else if (value === 0.5) {
            sliderDescription = "Balanced";
        } else if (value === 0.75) {
            sliderDescription = "Overstimulated";
        } else if (value === 1.0) {
            sliderDescription = "Overwhelmed"
        }
        this.setState({
            sliderValue: value,
            sliderDescription: sliderDescription
        });
    }
    render() {
        var {questions, step, sliderValue, sliderDescription, selectedStarNumber, nextPointIndication} = this.state;
        var {questionComplexity} = this.props;

        const renderQuestions = () => {
            return (
                <h2 className="question-title">{questions[step].question}</h2>
            )
        }

        const renderComplexAnswers = () => {
            var finalJSX = [];
            if(step >= 0 && step <=7) {
                questions[step].answers.forEach((answer) => {
                    finalJSX.push(<RaisedButton label={answer} labelStyle={{fontSize: '2vw', width: '100%', padding: '0'}} onClick={() => {
                        if(step == 0) {
                            this.incrementStep(answer == "Me" ? 1 : 2);
                        } else {
                            this.incrementStep();
                        }
                    }} key={answer} className="question-answer"/>)
                })
            } else if (step == 8 || step == 9) {
                for(let i = 0; i<selectedStarNumber; i++) {
                    finalJSX.push(<FontIcon key={i} className="material-icons" style={{fontSize: '6rem', marginLeft: '5%'}}>star</FontIcon>)
                }
                for(let i = selectedStarNumber; i<5; i++) {
                    finalJSX.push(<FontIcon key={i} onClick={() => this.incrementStep(i)} className="material-icons" style={{fontSize: '6rem', marginLeft: '5%'}}>star_border</FontIcon>)
                }
            } else if (step == 10) {
                finalJSX.push(
                    <div className="slider-container">
                        <Slider step={0.25} value={sliderValue} onChange={this.handleSliderValue} style={{width: '80%', marginLeft: '10%'}}/>
                        <p className="slider-description">{sliderDescription}</p>
                        <RaisedButton className="next-question-button" label="Next Point" primary={true} onClick={this.incrementStep} />
                        <Snackbar
                          open={true}
                          message="Add notes for point before clicking next point!"
                          autoHideDuration={3000}
                        />
                    </div>
                )
            }
            return finalJSX;
        }

        const renderSimpleAnswers = () => {
            var finalJSX = [];
            questions[step].answers.forEach((answer) => {
                finalJSX.push(<RaisedButton label={answer} labelStyle={{fontSize: '2vw', width: '100%', padding: '0'}} onClick={() => {
                    if(step == 0) {
                        this.incrementStepSimple(answer == "Me" ? 1 : 2);
                    } else {
                        this.incrementStepSimple();
                    }
                }} key={answer} className="question-answer"/>)
            })
            return finalJSX;
        }

        const renderBasicAnswer = () => {
            var finalJSX = [];
            questions[step].answers.forEach((answer) => {
                finalJSX.push(<RaisedButton label={answer} labelStyle={{fontSize: '2vw', width: '100%', padding: '0'}} onClick={() => {
                    if(step == 0) {
                        this.incrementStepBasic(answer == "Me" ? 1 : 2);
                    } else {
                        this.incrementStepBasic();
                    }
                }} key={answer} className="question-answer"/>)
            })
            return finalJSX;
        }

        const renderCorrectQuestionSet = () => {
            if(questionComplexity == 1) {
                return (
                    <div>
                        {renderQuestions()}
                        {renderComplexAnswers()}
                    </div>
                )
            } else if (questionComplexity == 2) {
                return (
                    <div>
                        {renderQuestions()}
                        {renderSimpleAnswers()}
                    </div>
                )
            } else if (questionComplexity == 3) {
                return (
                    <div>
                        {renderQuestions()}
                        {renderBasicAnswer()}
                    </div>
                )
            }
        }

        const renderNextPointIndication = () => {
            return (
                <h2 className="next-point-indication">Next Point</h2>
            )
        }

        const renderCorrectScreen = () => {
            var finalJSX = [];
            if(nextPointIndication) {
                finalJSX.push(<div>{renderNextPointIndication()}</div>)
            } else {
                finalJSX.push(<div>{renderCorrectQuestionSet()}</div>)
            }
            return finalJSX;
        }

        return (
          <div className="questions">
              {renderCorrectScreen()}
          </div>
        );
    }
};

export default Questions;
