import React from 'react';
import Calendar from './components/Calendar/Calendar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
        <div id='wiz-tomato-calendar' >
            <Calendar />
        </div>
    );
  }
}