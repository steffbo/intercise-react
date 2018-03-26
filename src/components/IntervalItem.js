import React, { Component } from 'react';
import _ from 'lodash'

const ENTER_KEY = 13;

class IntervalItem extends Component {

    constructor(props) {
        super();

        this.state = {
            name: props.item.name,
            timeleft: props.item.timeleft
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            timeleft: nextProps.item.timeleft
        })
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value })
    }

    handleChangeTimeleft(event) {
        this.setState({ timeleft: event.target.value })
    }

    getName() {
        if (this.props.item.isEditable) {
            return (<input type="text" value={this.state.name} onChange={(e) => this.handleChangeName(e)} onKeyDown={(e) => this.handleKeyDown(e)} />)
        } else {
            return (this.state.name ? this.state.name : "Break")
        }
    }

    getDuration() {
        if (this.props.item.isEditable) {
            return (<input type="text" value={this.state.timeleft} onChange={(e) => this.handleChangeTimeleft(e)} onKeyDown={(e) => this.handleKeyDown(e)} />)
        } else {
            return ("Time left: " + this.state.timeleft.toString())
        }
    }

    updateItem() {
        let newItem = _.cloneDeep(this.props.item)
        newItem.name = this.state.name
        newItem.timeleft = this.state.timeleft
        newItem.isEditable = false
        newItem.type = (this.state.name) ? "Exercise" : "Break"
        this.props.changeItem(newItem);
    }

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.updateItem()
        }
    }

    render() {
        const item = this.props.item
        const status = (item.type === "Break") ? 'break' : (item.active ? 'is-active' : item.timeleft <= 0 ? 'is-done' : 'is-upcoming')        
        const editIcon = item.isEditable ? "fas fa-check" : "fas fa-edit"
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
                        {this.getName()}
                    </div>

                    <div className="column is-two-fifths">
                        {this.getDuration()}
                    </div>

                    <div className="column">
                        <span className="icon" onClick={this.props.editItem}>
                            <i className={editIcon} />
                        </span>
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