const fs = require('fs');
const path = require('path');

// We don't have canvas in node by default. Let's write an HTML file we can open in Chrome,
// which will post the images back to a tiny local server.
