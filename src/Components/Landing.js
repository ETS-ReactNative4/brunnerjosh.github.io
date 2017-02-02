import React from 'react';
import Grid from './Grid/Grid';

export default class Landing extends React.Component {
  render () {

    const cells = [
      { label: 'About', img: 'About', onClick: () => { console.log('I was clicked!') } },
      { label: 'Professional', img: 'Work', onClick: () => { console.log('I was clicked!') } },
      { label: 'Education', img: 'Graduation', onClick: () => { console.log('I was clicked!') } },
      { label: 'Personal', img: 'Personal', onClick: () => { console.log('I was clicked!') } },
      { label: 'Thoughts', img: 'Thoughts', onClick: () => { console.log('I was clicked!') } },
      { label: 'Hobbies', img: 'Hobby', onClick: () => { console.log('I was clicked!') } },
      { label: 'Mail', img: 'Mail', onClick: () => { alert('email copied to clipboard') } },
      { label: 'LinkedIn', img: 'LinkedIn', onClick: () => { console.log('I was clicked!') } },
      { label: 'GitHub', img: 'GitHub', onClick: () => { console.log('I was clicked!') } }
    ]

    return (
      <Grid items={cells} />
    )
  }
}
