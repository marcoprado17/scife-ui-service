import React, { Component } from 'react'
import {
  Icon
} from 'semantic-ui-react';

class BoolIcon extends Component {
    render() {
        return this.props.value ? <Icon name='check'/> : <Icon name='close'/> 
    }
}

export default BoolIcon;
