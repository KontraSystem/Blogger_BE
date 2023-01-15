const pg = require('pg')

const client = new pg.Client(process.env.DB_URL)
client.connect(() => {
	console.log("Connected")
})

module.exports = client