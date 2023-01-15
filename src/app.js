const { createClient } = require('@supabase/supabase-js')
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const createError = require('http-errors');
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser')
const logger = require('morgan');

const auth = require('./routes/auth')
const posts = require('./routes/posts')
exports.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

var app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.use('/api/auth', auth);
app.use('/api/posts', posts)

app.get('/', (req, res) => {
  res.redirect('/api-docs');
  res.end();
});

app.listen(3100, () => {
  console.log(`Example app listening on port 3100`)
})

app.use((_req, _res, next) => {

  next(createError.NotFound());
});


module.exports = app;