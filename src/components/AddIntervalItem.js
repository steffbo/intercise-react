import React, { Component } from 'react'
import Item from './Item'

class AddIntervalItem extends Component {

    componentWillMount() {
        this.setState({
            item: new Item("", "Break", 10)            
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
        this.setState({ item: new Item("", "Break", 10) } )
        e.preventDefault()
    }

    render() {

        return (
            <div className="AddIntervalItem">
                <form onSubmit={(event) => { this.handleAddItem(event, this.state.item) }}>

                    <div className="box">
                        <nav className="panel">
                            <div className="panel-heading">New Item</div>
                            <div className="panel-block">
                                <div className="control has-icons-left">
                                    <input className="input is-small" type="text" value={this.state.item.name} 
                                           placeholder="empty for break!" onChange={(event) => { this.handleChangeName(event) }} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-plus-square"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="panel-block">
                                <div className="control has-icons-left">
                                    <div className="select is-small">
                                        <select value={this.state.item.duration} onChange={this.handleChangeDuration}>
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
                                    <div className="icon is-small is-left">
                                        <i className="fas fa-clock"></i>
                                    </div>
                                    &nbsp;<span className="tag is-info">seconds</span>
                                </div>
                            </div>
                            <div className="panel-block">
                                <button className="button is-link is-outlined is-fullwidth">
                                    Add {this.state.type}
                                </button>
                            </div>
                        </nav>
                    </div>

                </form>
            </div>
        );
    }
}

export default AddIntervalItem;