import React, { Component } from 'react';

const ENTER_KEY = 13;

export default class IntervalItem extends Component {

    constructor(props) {
        super();

        this.state = {
            item: props.item,
            name: props.item.name,
            timeleft: props.item.timeleft,
            duration: props.item.duration,
            isEditable: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ timeleft: nextProps.item.timeleft })
    }

    handleChangeName = (event) => {
        this.setState({ name: event.target.value })
    }

    // updates the state after the duration was changed
    handleChangeTimeleft = (event) => {
        const newTime = event.target.value

        // if item is currently active, only change the timeleft but not the duration
        this.setState({ 
            timeleft: newTime,
            duration: (!this.props.item.active) ? newTime : this.state.duration
        })          
    }

    // shows either an input to edit the name or just the name of the exercise
    getName() {
        if (this.state.isEditable) {
            return (<input type="text" value={this.state.name} onChange={this.handleChangeName} onKeyDown={this.handleKeyDown} />)
        } else {
            return (this.state.name ? this.state.name : "Break")
        }
    }

    // shows either an input to edit the duration or the timeleft of the exercise
    getDuration() {
        if (this.state.isEditable) {
            return (<input type="number" value={this.state.timeleft} min="0" onChange={this.handleChangeTimeleft} onKeyDown={this.handleKeyDown} />)
        } else {
            return ("Time left: " + this.state.timeleft)
        }
    }

    // makes this item either editable or emits an update
    // don't allow sending empty duration
    editItem = () => {
        // set editable
        if (!this.state.isEditable) {
            this.setState({isEditable: true})
            return
        }
        
        // update item if isEditable and timeleft is not empty
        if (this.state.isEditable && this.state.timeleft) {            
            this.setState({
                isEditable: false,
                timeleft: parseInt(this.state.timeleft, 10),
                duration: parseInt(this.state.duration, 10)
            })
            this.updateItem()
        }
    }

    // applies the current state to the original item and sends them to the parent component
    updateItem() {
        const newItem = { 
            ...this.props.item, 
            name: this.state.name,
            timeleft: parseInt(this.state.timeleft, 10),
            duration: parseInt(this.state.duration, 10)
        }
        this.props.changeItem(newItem);
    }

    // changes to the item can be submitted via enter key
    handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY) { this.editItem() }
    }

    render() {
        // don't show done items
        if (this.state.timeleft === 0) {
            return null
        }

        const item = this.props.item
        const status = (item.name === "") ? 'break' : (item.active ? 'is-active' : item.timeleft <= 0 ? 'is-done' : 'is-upcoming')        
        const editIcon = this.state.isEditable ? "done" : "edit"

        return (
            <tr className={status}>
                { !this.props.running && <td>                    
                    <i className="material-icons" onClick={this.props.upItem}>expand_less</i>
                    <i className="material-icons" onClick={this.props.downItem}>expand_more</i>                     
                </td>}
                <td>
                    {this.getName()}
                </td>
                <td>
                    {this.getDuration()}
                </td>
                { !this.props.running &&<td>
                    <i className="material-icons" onClick={this.editItem}>{editIcon}</i>
                    <i className="material-icons" onClick={this.props.deleteItem}>delete</i>
                </td>}
            </tr>
        );
    }
}