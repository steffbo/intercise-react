import React, { Component } from 'react'
import Item from '../model/Item'

export default class AddIntervalItem extends Component {

    componentWillMount() {
        this.setState({ item: new Item("", 20) })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.running !== nextProps.running
    }

    handleChangeName = (event) => {
        const item = { ...this.state.item, name: event.target.value ? event.target.value : "" }
        this.setState({ item: item })
        this.forceUpdate()
    }

    handleChangeDuration = (event) => {
        const item = { ...this.state.item }
        item.duration = parseInt(event.target.value, 10)
        item.timeleft = parseInt(event.target.value, 10)
        this.setState({ item: item })
        this.forceUpdate()
    }

    handleAddItem = (event) => {
        this.props.addItem(this.state.item)
        this.setState({ item: new Item("", this.state.item.duration) } )
        this.forceUpdate()
        event.preventDefault()
    }

    render() {
        // don't show this if the training is running
        if (this.props.running) { return null }
        
        return (
            <div className="AddIntervalItem w-25">
            <h2>Add Item</h2>
                <form onSubmit={this.handleAddItem}>

                    <div className="card">
                        <div className="card-body">

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="exercise">New Item &nbsp; &nbsp;</label>
                                </div>
                                <input id="exercise" className="form-control" type="text" value={this.state.item.name} 
                                    placeholder="empty for break!" onChange={this.handleChangeName} />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="duration">Duration (s)</label>
                                </div>
                                <select className="custom-select" id="duration" value={this.state.item.duration} onChange={this.handleChangeDuration}>
                                    <option>10</option>
                                    <option>15</option>
                                    <option>20</option>
                                    <option>25</option>
                                    <option>30</option>
                                    <option>40</option>
                                    <option>45</option>
                                    <option>50</option>
                                    <option>60</option>
                                    <option>75</option>
                                    <option>90</option>
                                    <option>100</option>
                                    <option>120</option>
                                </select>
                            </div>
                            
                            <button type="submit" className="btn btn-info is-outlined is-fullwidth">
                                Add {this.state.item.name === "" ? "Break" : "Exercise"}
                            </button>                            
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}