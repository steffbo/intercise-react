import React, { Component } from 'react';

class AddIntervalItem extends Component {

    constructor(props) {
        super(props);
        this.state = { type: "Break", name: "", duration: "60" }
    }

    handleChangeName = (e) => {
        this.setState(e.target.value ?
            { type: "Exercise", name: e.target.value } :
            { type: "Break", name: "" });
    }

    handleChangeDuration = (e) => {
        this.setState({ duration: e.target.value });
    }

    // handleSubmit = (e) => {
    //     //console.log(this.state);
    //     console.log(this.props.items);
        
    //     let newArray = this.props.items.slice();
    //     newArray.push(this.state);
    //     console.log(newArray);
    //     e.preventDefault();
    // }

    render() {

        return (
            <div className="AddIntervalItem">
                <form onSubmit={this.props.onAddItem}>

                    <div className="box">
                        <nav className="panel">
                            <div className="panel-heading">New Item</div>
                            <div className="panel-block">
                                <div className="control has-icons-left">
                                    <input className="input is-small" type="text" value={this.state.name} placeholder="empty for break!" onChange={this.handleChangeName} />
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