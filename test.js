// https://github.com/chamerling/ds18b20/blob/master/lib/ds18b20.js

var ds18b20 = require('ds18b20');
var fs = require('fs');
// var fsp = require('fs').promises;
var chalk = require('chalk');

var x = 0;
function readData() {
  console.log('###### ', x++);
  ds18b20.sensors(function(err, ids) {
    console.log(chalk.underline('number of sensors >>> ' + ids.length) );
    let inc = 0;


    ids.forEach((id, ndx) => {
      // console.log(' >>>> ', id);
      fs.readFile('/sys/bus/w1/devices/' + id + '/w1_slave', 'utf8', function(err, data) {
        try {
          inc++;
          const temp = data.replace(/\r?\n|\r/g, '').split("t=")[1];
          if(temp < 0 ){
            console.log('sensor '+ chalk.yellow(inc)+ ' > ' + id + ' >> ' , chalk.red(temp));
          } else {
            console.log('sensor '+ chalk.yellow(inc)+ ' > ' + id + ' >> ' , chalk.blue(temp));
          }
        } catch (e) {
          inc++;
          console.log('sensor error' + id + ' >> ' + e);
        }
        // console.log(inc, ' >>> ', ids.length);
        if (inc == ids.length) {
          setTimeout(() => {
            console.log('\033c'); // clear the console
            readData();
          }, 2500);
        }
      });

    }); // end forEach sensor id


  });
}

console.log('\033c'); // clear the console
readData();


// fs.readdir('/sys/bus/w1/devices/28-000009b86a72/', (err, files) => {
//   console.log(files);
// })
// fs.readFile('/sys/bus/w1/devices/28-000009b86a72/w1_slave ', function read(err, data) {
//   console.log('>>>>>> ', data);
// });

// got sensor IDs ...
// ds18b20.sensors(function(err, ids) {
//   ids.forEach((id, ndx) => {
//     // console.log(' >>>> ', id);
//     fs.readFile('/sys/bus/w1/devices/' + id + '/w1_slave', 'utf8', function(err, data) {
//       try {
//         const temp = data.replace(/\r?\n|\r/g, '').split("t=")[1];
//         console.log('sensor ' + id +' >> '+ temp);
//       } catch(e) {
//       }
//     });
//   });
// });
