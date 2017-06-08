import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';

class Questions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            questions: [
                {
                    question: "Who won the point?",
                    step: 0,
                    answers: [
                        "Me",
                        "Opponent"
                    ]
                },
                {
                    question: "Which shot the point finished on (serve, return, 3rd ball, 4th ball, ect)",
                    step: 1,
                    answers: [
                        "Serve",
                        "Serve Return",
                        "3rd Ball",
                        "4th Ball",
                        "5th Ball",
                        "6th Ball or greater"
                    ]
                },
                {
                    question: "Did winner WIN the point or did loser LOSE the point?",
                    step: 2,
                    answers: [
                        "Winner WON",
                        "Loser LOST"
                    ]
                },
                {
                    question: "What type of shot was point won or lost with?",
                    step: 3,
                    answers: [
                        "Serve",
                        "Serve Return",
                        "Loop",
                        "Smash",
                        "Chop",
                        "Lob",
                        "Fish"
                    ]
                },
                {
                    question: "Backhand or forehand?",
                    step: 4,
                    answers: [
                        "Backhand",
                        "Forehand"
                    ]
                },
                {
                    question: "What type was the shot just before the last shot?",
                    step: 5,
                    answers: [
                        "Serve",
                        "Serve Return",
                        "Loop",
                        "Smash",
                        "Chop",
                        "Lob",
                        "Fish"
                    ]
                },
                {
                    question: "Backhand or forehand?",
                    step: 6,
                    answers: [
                        "Backhand",
                        "Forehand"
                    ]
                },
                {
                    question: "If you won the point - was it a practiced combination/serve or was it improvised?",
                    step: 7,
                    answers: [
                        "Practiced",
                        "Improvised"
                    ]
                },
                {
                    question: "Effort Rating",
                    step: 8,
                    answers: [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5"
                    ]
                },
                {
                    question: "Technique Rating",
                    step: 9,
                    answers: [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5"
                    ]
                },
                {
                    question: "Emotional Scale",
                    step: 10,
                    answers: [
                        "Too Calm",
                        "Neutral",
                        "Too Aggressive"
                    ]
                }
            ],
            sliderValue: 0.5,
            sliderDescription: "Balanced"
        }

        this.incrementStep = this.incrementStep.bind(this);
        this.handleSliderValue = this.handleSliderValue.bind(this);
    }
    incrementStep() {
        var step = this.state.step;
        if(step < 10) {
            this.setState({
                step: ++step
            })
        } else {
            this.props.endGame();
        }
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
        var {questions, step, sliderValue, sliderDescription} = this.state;

        const renderQuestion = () => {
            return (
                <h2 className="question-title">{questions[step].question}</h2>
            )
        }

        const renderAnswers = () => {
            var finalJSX = [];
            if(step >= 0 && step <=7) {
                questions[step].answers.forEach((answer) => {
                    finalJSX.push(<RaisedButton label={answer} onClick={this.incrementStep} key={answer} className="question-answer"/>)
                })
            } else if (step == 8 || step == 9) {
                for(let i = 0; i<5; i++) {
                    finalJSX.push(<FontIcon key={i} onClick={this.incrementStep} className="material-icons" style={{fontSize: '6rem', marginLeft: '5%'}}>star_border</FontIcon>)
                }
            } else if (step == 10) {
                finalJSX.push(
                    <div className="slider-container">
                        <Slider step={0.25} value={sliderValue} onChange={this.handleSliderValue} style={{width: '80%', marginLeft: '10%'}}/>
                        <p className="slider-description">{sliderDescription}</p>
                        <RaisedButton className="next-question-button" label="Next Question" primary={true} onClick={this.incrementStep} />
                    </div>
                )
            }
            return finalJSX;
        }

        return (
          <div className="questions">
            {renderQuestion()}
            {renderAnswers()}
          </div>
        );
    }
};

export default Questions;
