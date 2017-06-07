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
                <h2>Notes</h2>
                <textarea onChange={this.updatePointNotes} ref="pointNotes"></textarea>
            </div>
        );
    }
};

export default Notes;
