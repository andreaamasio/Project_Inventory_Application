require("dotenv").config()
const { Pool } = require("pg")
if (!process.env.DATABASE_URL) {
  throw new Error(
    "❌ DATABASE_URL is missing! Check Render environment variables."
  )
}
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
// module.exports = new Pool({
//   host: process.env.PGHOST, // or wherever the db is hosted
//   user: process.env.PGUSER,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: 5432, // The default port
// })
