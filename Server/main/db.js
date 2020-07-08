const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.USER,
  host: 'localhost',
  database: process.env.DATABASE,
  password: '',
  post: process.env.POST
})

module.exports = pool

