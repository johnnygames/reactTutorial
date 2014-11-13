'use strict';

/* Goal: Build a tic tac toe game!
  
  Note: If at any point you get stuck, look to steps directory for guidance

  Steps:
    1. Build a react component called Box, render that component to the page.

    2. Give Box a property that dictates what text it renders, render an 'X'

    3. Give Box some style! Make it a div with 

    4. Have Box render text based on its state.

    5. Have Box's state change every 300ms, alternating between 'X' and 'O'.
      a. Where should this be written?
      b. This is a good moment to learn about the component cycle!
      c. Make sure to clear you interval!

    6. Have Box's state change based on clicks. Set inital state to '-'.
      a. How do we set up an event handler for React components?
      b. Make Box alternate between 'X' and 'O' on clicks.
    
    7. Let's make a new component called Row that renders 3 Box components.
    
    8. Pull the state out of each Box and into the higher level Row component.
      a. Hint, use map!
      b. Don't forget to pass each child Box a key property.
    
    9. Rig up the event handling so that clicks on a Box component change the 
      state on their parent Row component.

    10. Now create a Board component that renders three Row components.

    11. Pull the state out of the Row components and into the Board component.

    12. Rig up event handling so clicks on Box's bubble up to the Board itself.


*/

var React = require('react');

var boxStyle = {
  height: '100px',
  width: '100px'
};

var Box = React.createClass({
  handleClick: function(){
    this.props.handleClick(this.props.rowIndex);
  },
  render: function(){
    return (
      <button 
        style={boxStyle}
        onClick={this.handleClick}
      >
        {this.props.value}
      </button>
    );
  }
});

var Row = React.createClass({
  handleClick: function(rowIndex){
    this.props.handleClick(this.props.boardIndex, rowIndex);
  },
  render: function(){
    var _this = this;
    var boxes = this.props.rowValues.map(function(value, index){
      return (
        <Box value={value} key={index} rowIndex={index} handleClick={this.handleClick}/>
      );
    }.bind(this));
    return (
      <div>
        {boxes}
      </div>
    );
  }
});

var Board = React.createClass({
  getInitialState: function(){
    return {
      clicks: 0,
      boardValues: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ]
    };
  },
  handleClick: function(boardIndex, rowIndex){
    var boardValues = this.state.boardValues;
    var newValue = 'X';
    if(this.state.clicks % 2 === 0){
      newValue = 'O';
    }
    boardValues[boardIndex][rowIndex] = newValue;
    this.setState({
      clicks: this.state.clicks + 1,
      boardValues: this.state.boardValues
    });
  },
  render: function(){
    var rows = this.state.boardValues.map(function(row, index){
      return (
        <Row key={index} rowValues={row} boardIndex={index} handleClick={this.handleClick}/>
      )
    }.bind(this));
    return (
      <div>
        {rows}
      </div>
    );
  }
});


React.render(<Board/>, document.body);