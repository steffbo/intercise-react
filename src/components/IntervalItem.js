import React, { Component } from 'react';

class IntervalItem extends Component {

    render() {
        const item = this.props.item;
        return (
            <div className="panel-block">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            {item.name} - {item.duration}
                        </div>
                    </div>

                    <div className="level-right">
                        <div className="level-item">
                            <span className="icon">
                                <i className="fas fa-minus-square" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IntervalItem;