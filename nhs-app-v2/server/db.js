const Pool = require("pg").Pool


//re add pass-word to get this to work
console.log("Reminder to re-add the password")
const pool = new Pool({
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "nhsdb"
})

module.exports = pool