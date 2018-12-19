/* eslint-disable */
ScrieTempSet('28-000009b7fb69', '19');

function ScrieTempSet(ID, temp) {

	var x = ID;
	var y = temp;
	var mysql = require('mysql');

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		database: "mydb"
	});

	con.connect(function(err) {
		if (err) throw err;
		var sql = "UPDATE Camere SET TemperaturaSetata = " + "'" + y + "'" + " WHERE SenzorID = " + "'" + x + "'";
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log(" Functia sa executat cu succes");
		});
	});

	// con.end((err) => {
			// console.log(" Conexiunea cu baza de date a fost inchisa");
			//The connection is terminated gracefully
			//Ensures all previously enqueued queries are still
			//before sending a COM_QUIT packet to the MySQL server.
		// });// Nu functioneaza end

}


//var LED = new Gpio(3, 'out'); //use GPIO pin 3 as output
//LED.writeSync(0); // Turn LED off



// Error: connect ETIMEDOUT is from the Node.js networking code.
// It means that a TCP connection could not be established to your MySQL server.
// Usually this is a networking or firewall issue.
