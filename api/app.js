var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var { Pool } = require('pg');
var cors = require('cors');
var logger = require('morgan');
var www = require('./bin/www');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: '5432',
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connectiong to the database:', err);
    return;
  }
  console.log('Connected to PostgreSQL database');
  done();
});

app.post('/save', async (req, res) => {
  try {
    const client = await pool.connect();
    const data = req.body.data;
      
    for (const item of data) {
      const { name, company, email, phone, id } = item;
      const companyName = company.name
      await client.query('INSERT INTO public.users (name, company, email, phone, id) VALUES ($1, $2, $3, $4, $5)', [name, companyName, email, phone, id]); 
    }
    
    client.release();
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
});

app.get('/getUsers', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users ORDER BY id');
    client.release();

    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
