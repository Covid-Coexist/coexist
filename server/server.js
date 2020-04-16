const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const sessionController = require('./controllers/sessionController');

//listen on port 3000
const PORT = 3000;

//require in routers
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

//parse body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// generate session and add to session table
app.use(session({
  secret: 'keyboard cat',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  name: 'board.id'
}));

//route handlers
app.use('/api', apiRouter); // handling user data
app.use('/auth', authRouter); //login and signup

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
}

app.get('/checkLogin', sessionController.verify, (req, res) => {
  if (req.session.boardId) {
    res.locals.boardId = req.session.boardId
    res.locals.authorized = true;
    res.status(200).json(res.locals);
  } else {
    res.locals.authorized = false;
    res.status(200).json(res.locals);
  }
})

app.get('/dashboard', (req, res) => {
  res.redirect('/');
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

//catch all
app.use('/', (req, res) => {
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log('COVEXIST is listening on port ' + PORT));
