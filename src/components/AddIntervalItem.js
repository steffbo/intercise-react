import React, { Component } from 'react';

class AddIntervalItem extends Component {

    componentWillMount() {
        this.setState({
            type: "Break",
            name: "",
            duration: 60,
            timeleft: 60,
            active: false
        })
    }

    handleChangeName = (e) => {
        this.setState(e.target.value ?
            { type: "Exercise", name: e.target.value } :
            { type: "Break", name: "" });
    }

    handleChangeDuration = (e) => {
        this.setState({
            duration: parseInt(e.target.value, 10),
            timeleft: parseInt(e.target.value, 10)
        });
    }

    handleAddItem = (e, item) => {
        this.props.addItem(item)
        e.preventDefault()
    }

    render() {

        return (
            <div className="AddIntervalItem">
                <form onSubmit={(event) => { this.handleAddItem(event, this.state) }}>

                    <div className="box">
                        <nav className="panel">
                            <div className="panel-heading">New Item</div>
                            <div className="panel-block">
                                <div className="control has-icons-left">
                                    <input className="input is-small" type="text" value={this.state.name} placeholder="empty for break!" onChange={(event) => { this.handleChangeName(event) }} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-plus-square"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="panel-block">
                                <div className="control has-icons-left">
                                    <div className="select is-small">
                                        <select value={this.state.duration} onChange={this.handleChangeDuration}>
                                            <option>10</option>
                                            <option>20</option>
                                            <option>30</option>
                                            <option>40</option>
                                            <option>50</option>
                                            <option>60</option>
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