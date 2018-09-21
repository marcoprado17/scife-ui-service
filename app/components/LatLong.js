import React, { Component } from 'react'
import {
  Icon
} from 'semantic-ui-react';

class BoolIcon extends Component {
    render() {
        return (
            <a href={`http://www.google.com/maps/place/${this.props.lat},${this.props.long}`} target="_new">
                {this.props.lat}, {this.props.long}
            </a>
        )
    }
}

export default BoolIcon;
