import React from 'react';
import Button from './Shared/Button';

export default class Landing extends React.Component {
  render () {
    return (
      <div>
      This is the landing page!
      <button onClick={this.props.addNumber}>Add</button>
      {this.props.number}
      <button onClick={this.props.subtractNumber}>Subtract</button>
      <Button />
      <Button />
      <Button />
      Weeeee!!!
      </div>
    )
  }
}