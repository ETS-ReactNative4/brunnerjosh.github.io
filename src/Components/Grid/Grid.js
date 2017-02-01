import React from 'react';
import GridCell from './GridCell';
import './Grid.css';

export default class Grid extends React.Component {

  renderGridCells () {
    return this.props.items.map( (item, index) => {
      return <GridCell key={index} index={index} items={this.props.items} />
    })
  }

  render () {
    return (
      <div className='grid'>
        <div className='grid__container'>
          {this.renderGridCells()}
        </div>
      </div>
    )
  }
}