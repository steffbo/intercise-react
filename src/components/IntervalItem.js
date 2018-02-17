import React, { Component } from 'react';

class IntervalItem extends Component {

    render() {
        const item = this.props.item;
        return (
            <div className="panel-block" style={{ display: 'block' }}>
                <div className="columns">

                    <div className="column">
                        <span className="icon" onClick={this.props.upItem}>
                            <i className="fas fa-angle-up" />
                        </span>
                        <span className="icon" onClick={this.props.downItem}>
                            <i className="fas fa-angle-down" />
                        </span>
                    </div>

                    <div className="column is-one-fifths">
                        {item.name ? item.name : "Break"}
                    </div>

                    <div className="column is-two-fifths">
                        {item.timeleft}
                    </div>

                    <div className="column">
                        <span className="icon" onClick={this.props.deleteItem}>
                            <i className="fas fa-minus-square" />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default IntervalItem;