const mysql = require('mysql');
const fs = require('fs');
var payments = 0;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    let config = {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
        port: 3306,
        ssl: fs.readFileSync(process.env.ssl)
    };

    const conn = new mysql.createConnection(config);

    conn.connect(
        async function (err) {
            console.log("connect")
        if (err) {
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        } else {
            console.log("Connection established.");
            var dt = new Date();
            dt.setDate(dt.getDate() - dt.getDate() + 1);
            var y = dt.getFullYear();
            var m = ('00' + (dt.getMonth()+1)).slice(-2);
            var d = ('00' + dt.getDate()).slice(-2);
            date = y + '-' + m + '-' + d;
            // date = '2022-02-04 00:00:00';
            console.log(date)

            // queryDatabase();
            let uid = req.query.id;
            sql = `SELECT * FROM payments WHERE uid='${uid}' AND date >= '${date}'`
            await conn.query(sql, function (err, results, fields) {
                    if (err) throw err;
                    else console.log('Selected ' + results.length + ' row(s).');

                    for (i = 0; i < results.length; i++) {
                        // console.dir(results[i].payment)
                        payments += results[i].payment;
                        console.log("payments: " + payments)
                        console.log('Row: ' + JSON.stringify(results[i]));
                    }
                    console.log('Done.');
                }
            );
            await conn.end(
                function (err) { 
                    if (err) throw err;
                    else console.log('Closing connection.')
                }
            );
        }
    });
    console.log(payments);
    context.res = {
        state: 200,
        body: payments
    }
    payments = 0;
}
