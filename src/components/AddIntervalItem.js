import React, { Component } from 'react';

class AddIntervalItem extends Component {

    render() {
        return (
            <div className="AddIntervalItem">
                <form>

                    <nav className="panel">
                        <p className="panel-heading">
                            New Item
                        </p>
                        <div className="panel-block">
                            <p className="control has-icons-left">
                                <input className="input is-small" type="text" placeholder="exercise" />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-bowling-ball"></i>
                                </span>
                            </p>
                        </div>
                        <div className="panel-block">
                            <button className="button is-link is-outlined is-fullwidth">
                                reset all filters
                                </button>
                        </div>
                    </nav>

                    <h2>New Exercise</h2>

                    <div className="field">
                        <div className="control">
                            <input className="input" type="text" ref="newExercise" placeholder="Name" />

                            <div className="select">
                                <select>
                                    <option>20</option>
                                    <option>30</option>
                                    <option>40</option>
                                    <option>50</option>
                                    <option>60</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <input className="button is-primary" type="submit" value="Add Exercise" />
                </form>
            </div>
        );
    }
}

export default AddIntervalItem;