import React from 'react';

class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pointNotes: ""
        }

        this.updatePointNotes = this.updatePointNotes.bind(this);
    }
    updatePointNotes() {
        var pointNotes = this.refs.pointNotes.value;

        this.setState({
            pointNotes: pointNotes
        })
    }
    render() {
        return (
            <div className="notes">
                <h2 className="notes-header">Point Notes</h2>
                <textarea className="notes-box" onChange={this.updatePointNotes} ref="pointNotes" placeholder="Enter point notes"></textarea>
            </div>
        );
    }
};

export default Notes;
