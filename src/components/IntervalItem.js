import React, { Component } from 'react';

class IntervalItem extends Component {

    render() {
        const item = this.props.item;
        const status = (item.active ? 'is-active' : item.timeleft <= 0 ? 'is-done' : 'is-upcoming')
        return (
            <div className={"panel-block " + status} style={{ display: 'block' }}>
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
                        Time left: {item.timeleft.toString()}
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