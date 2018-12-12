const fs = require('fs');

fs.watch( 'wsServer.js', function ( curr, prev ) {
   console.log('file changed ');
 });
