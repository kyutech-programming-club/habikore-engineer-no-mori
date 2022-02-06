const mysql = require('mysql');

// conn.connect(
//     function (err) { 
//         if (err) { 
//             console.log("!!! Cannot connect !!! Error:");
//             throw err;
//         }
//         else {
//             console.log("Connection established.");
//             readData();
//         }
//     }
// );

// function readData(){
//     conn.query('SELECT * FROM inventory', 
//         function (err, results, fields) {
//             if (err) throw err;
//             else console.log('Selected ' + results.length + ' row(s).');
//             for (i = 0; i < results.length; i++) {
//                 console.log('Row: ' + JSON.stringify(results[i]));
//             }
//             console.log('Done.');
//         })
//     conn.end(
//         function (err) { 
//             if (err) throw err;
//             else  console.log('Closing connection.') 
//     });
// };

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    let config = {
        host: process.env["HOST"],
        user: process.env["USER"],
        password: process.env["PASSWORD"],
        database: process.env["DATABASE_NAME"],
        port: 3306,
        ssl: true
    };

    const conn = new mysql.createConnection(config);

    function queryDatabase() {
        conn.query('DROP TABLE IF EXISTS payments;', function (err, results, fields) { 
            if (err) throw err; 
            console.log('Dropped payment table if existed.');
        })
            conn.query('CREATE TABLE payments (id serial PRIMARY KEY, uid VARCHAR(50), date DATE, payment INTEGER);', 
                function (err, results, fields) {
                    if (err) throw err;
            console.log('Created payments table.');
        })
        conn.query('INSERT INTO payments (uid, date, payment) VALUES (?, ?, ?);', ['91f19d68-7267-46e9-8f86-107619c6495e', '2022-02-01', 150], 
            function (err, results, fields) {
                if (err) throw err;
                else console.log('Inserted ' + results.affectedRows + ' row(s).');
            }
        );

        conn.query('INSERT INTO payments (uid, date, payment) VALUES (?, ?, ?);', ['91f19d68-7267-46e9-8f86-107619c6495e', '2022-02-02', 150], 
            function (err, results, fields) {
                if (err) throw err;
                else console.log('Inserted ' + results.affectedRows + ' row(s).');
            }
        );

        conn.query('INSERT INTO payments (uid, date, payment) VALUES (?, ?, ?);', ['91f19d68-7267-46e9-8f86-107619c6495e', '2022-02-03', 150], 
            function (err, results, fields) {
                if (err) throw err;
                else console.log('Inserted ' + results.affectedRows + ' row(s).');
            }
        );

        conn.query('INSERT INTO payments (uid, date, payment) VALUES (?, ?, ?);', ['91f19d68-7267-46e9-8f86-107619c6495e', '2022-02-04', 150], 
            function (err, results, fields) {
                if (err) throw err;
                else console.log('Inserted ' + results.affectedRows + ' row(s).');
            }
        );

        conn.query('INSERT INTO payments (uid, date, payment) VALUES (?, ?, ?);', ['91f19d68-7267-46e9-8f86-107619c6495e', '2022-02-05', 150], 
            function (err, results, fields) {
                if (err) throw err;
                else console.log('Inserted ' + results.affectedRows + ' row(s).');
            }
        );
        
        conn.end(function (err) { 
            if (err) throw err;
            else  console.log('Done.') 
        });
    };

    conn.connect(
        function (err) { 
        if (err) { 
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        } else {
        console.log("Connection established.");
            queryDatabase();
        }
    });
}
