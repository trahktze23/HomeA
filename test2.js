var fs = require('fs');
var chalk = require('chalk');
// /sys/bus/w1/devices
  // fs.readFile('/sys/bus/w1/devices/' + id + '/w1_slave', 'utf8', function(err, data) {
  // let filesList= [];
  // fs.readdir('/sys/bus/w1/devices/', (err, files) => {
  //   filesList = files.filter(file=> !file.includes('w1') );
  //   // console.log('files >> 2', filesList);
  // })


  var x = 0;
  function readData() {
    // console.log('###### ', x++);
    let filesList= [];
    fs.readdir('/sys/bus/w1/devices/', (err, files) => {
      filesList = files.filter(file=> !file.includes('w1') );
      filesList.sort();
      // console.log('files >> 2', filesList);
      // console.log(chalk.underline('number of sensors >>> ' + filesList.length) );
      let inc = 0;

      // console.log('filesList name >>>', filesList )
      // console.log('number of idss >>>', filesList.length )
      const temps={};
      filesList.forEach((id, ndx) => {
        // console.log(' >>>> ', id);
        fs.readFile('/sys/bus/w1/devices/' + id + '/w1_slave', 'utf8', function(err, data) {
          try {
            inc++;
            const temp = data.replace(/\r?\n|\r/g, '').split("t=")[1];
            temps[id] = temp;
            if(temp < 0 ){
              console.log('sensor '+ chalk.yellow(inc)+ ' > ' + id + ' >> ' , chalk.red(temp));
            } else {
              // console.log('sensor '+ chalk.yellow(inc)+ ' > ' + id + ' >> ' , chalk.blue(temp));
            }
          } catch (e) {
            inc++;
            // console.log('sensor error' + id + ' >> ' + e);
          }
          // console.log(inc, ' >>> ', filesList.length);
          if (inc == filesList.length) {
            // console.log('data >> ',temps);

            console.log('\033c'); // clear the console
            console.log('###### ', x++);
            console.log(chalk.underline('number of sensors >>> ' + filesList.length) );
            Object.keys(temps).sort().forEach((sensorid,index)=>{
              console.log('sensor '+ chalk.yellow(index)+ ' > ' + sensorid + ' >> ' , chalk.blue(temps[sensorid]));
            });
            setTimeout(() => {
              // console.log('\033c'); // clear the console
              readData();
            }, 2500);
          }
        });

      }); // end forEach sensor id


    });
  }

  // console.log('\033c'); // clear the console
  readData();
