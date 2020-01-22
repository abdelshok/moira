
// Blessed area

var blessed = require('blessed');

// Create a screen object.
var testScreen = blessed.screen({
  smartCSR: true
});

testScreen.title = 'LMFAO Chat';

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});


// Append our box to the screen.
testScreen.append(box);


// Quit on Escape, q, or Control-C.
testScreen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  
  // Focus our element.
box.focus();

module.exports = {
    testScreen
}