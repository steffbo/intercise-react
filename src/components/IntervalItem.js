import React, { Component } from 'react';
import _ from 'lodash'

const ENTER_KEY = 13;

class IntervalItem extends Component {

    constructor(props) {
        super();

        this.state = {
            name: props.item.name,
            timeleft: props.item.timeleft,
            duration: props.item.duration,
            isEditable: props.item.isEditable
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
        if (this.state.isEditable) {
            this.setState({ 
                timeleft: parseInt(event.target.value, 10)
            })
        } else {
            this.setState({ 
                timeleft: parseInt(event.target.value, 10),
                duration: parseInt(event.target.value, 10)
            })
        }        
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
        newItem.duration = this.state.duration
        newItem.isEditable = false
        newItem.type = (this.state.name) ? "Exercise" : "Break"
        this.props.changeItem(newItem);
    }

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) { this.updateItem() }
    }

    render() {
        if (this.state.timeleft === 0) {
            return null
        }

        const item = this.props.item
        const status = (item.type === "Break") ? 'break' : (item.active ? 'is-active' : item.timeleft <= 0 ? 'is-done' : 'is-upcoming')        
        const editIcon = item.isEditable ? "done" : "edit"

        return (
            <tr className={status}>
                <td>
                    <i className="material-icons" onClick={this.props.upItem}>expand_less</i>
                    <i className="material-icons" onClick={this.props.downItem}>expand_more</i>
                </td>
                <td>
                    {this.getName()}
                </td>
                <td>
                    {this.getDuration()}
                </td>
                <td>
                    <i className="material-icons" onClick={this.props.editItem}>{editIcon}</i>
                    <i className="material-icons" onClick={this.props.deleteItem}>delete</i>
                </td>
            </tr>
        );
    }
}

export default IntervalItem;