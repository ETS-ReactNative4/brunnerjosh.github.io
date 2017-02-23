import React from 'react';
import PageContent from '../PageContent/PageContent';

const paragraph1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'


export default class Education extends React.Component {

  renderPageContent () {
    return (
      <div>
        <h1>Education</h1>
        <p>{paragraph1}</p>
        <p>{paragraph1}</p>
      </div>
    )
  }

  render () {
    return (
      <PageContent
        fontSize={20}
        rightSide={{
          classes: 'col-xs-12',
          content: this.renderPageContent()
        }}
        />
    )
  }
}
