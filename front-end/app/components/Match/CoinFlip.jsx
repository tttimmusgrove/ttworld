import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import coin_heads from '../../../content/coin-heads.jpg';
import coin_tails from '../../../content/coin-tails.jpg';

class CoinFlip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            server: this.props.server,
            flipping: false
        }

        this.flipCoin = this.flipCoin.bind(this);
    }
    flipCoin() {
        var server = Math.floor(Math.random() * 2) + 1;
        this.setState({
            flipping: true
        })
        setTimeout(() => {
            this.props.setServer(server)
            this.setState({
                server: server,
                flipping: false
            })
        }, 1000)
    }
    render() {
        var {server, flipping} = this.state;

        const renderFlipIndicator = () => {
            if(flipping) {
                return (
                    <p className="flip-indicator">Flipping...</p>
                )
            }
        }

        return (
            <div className="coin">
                <div className="flipper">
                    <div className="coin-front" style={server == 2 ? {display: 'none'} : {}}>
                        <img src={coin_heads} className="coin-heads" style={flipping ? {transition: 'translate 1s', translate: 'rotate(360deg)'} : {}} />
                    </div>
                    <div className="coin-back" style={(server == 1 || server == 0) ? {display: 'none'} : {}}>
                        <img src={coin_tails} className="coin-tails" style={flipping ? {transition: 'translate 1s', translate: 'rotate(360deg)'} : {}} />
                    </div>
                    <RaisedButton label="Flip Coin" primary={true} onClick={this.flipCoin} className="flip-coin-button" style={{display: 'inline-block'}} />
                    {renderFlipIndicator()}
                </div>
            </div>
        );
    }
};

export default CoinFlip;
