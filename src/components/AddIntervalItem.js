import React, { Component } from 'react'
import Item from '../model/Item'

class AddIntervalItem extends Component {

    componentWillMount() {
        this.setState({
            item: new Item("", "Break", 20)            
        })
    }

    handleChangeName = (e) => {
        const item = this.state.item
        if (e.target.value) {
            item.type = "Exercise"
            item.name = e.target.value
        } else {
            item.type = "Break"
            item.name = ""
        }
        this.setState({ item: item })
    }

    handleChangeDuration = (e) => {
        const item = this.state.item
        item.duration = parseInt(e.target.value, 10)
        item.timeleft = parseInt(e.target.value, 10)
        this.setState({ item: item })
    }

    handleAddItem = (e, item) => {
        this.props.addItem(item)
        this.setState({ item: new Item("", "Break", item.duration) } )
        e.preventDefault()
    }

    render() {

        return (
            <div className="AddIntervalItem">
            <h2>Add Item</h2>
                <form onSubmit={(event) => { this.handleAddItem(event, this.state.item) }}>

                    <div className="card">
                        <div className="card-body">

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="exercise">New Item &nbsp; &nbsp;</label>
                                </div>
                                <input id="exercise" className="form-control" type="text" value={this.state.item.name} 
                                    placeholder="empty for break!" onChange={(event) => { this.handleChangeName(event) }} />
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
                            
                            <button type="button" className="btn btn-info is-outlined is-fullwidth">
                                Add {this.state.item.type}
                            </button>                            
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddIntervalItem;