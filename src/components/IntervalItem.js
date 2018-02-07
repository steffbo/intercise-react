import React, { Component } from 'react';

class IntervalItem extends Component {

    render() {
        const item = this.props.item;
        return (
            <div className="IntervalItem">
                {item.name} - {item.duration}
            </div>
        );
    }
}

export default IntervalItem;