import React, { Component } from 'react';

class Interval extends Component {

    render() {

      let items;
      if (this.props.interval) {
          items = this.props.interval.items.map(item => {
              console.log(item);
          });
      }

      return (
        <div>
          <ul>
            {
                this.props.interval.items.map(item => {
                    return <li>{item.name}</li>
                })
            }
          </ul>
        </div>
      );
    }
  }
  
  export default Interval;