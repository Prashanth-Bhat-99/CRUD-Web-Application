const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();


 const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
 const {getShowPage} = require('./routes/show');
 const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root12345',
    database: 'socka'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

 const {getHomePage} = require('./routes/index');
 const {getString_IndianPage} =require('./routes/string-indian');
 const {getKey_IndianPage} =require('./routes/key-indian');
 const {getPercussion_IndianPage} =require('./routes/percussion-indian');
 const {getWind_IndianPage} =require('./routes/wind-indian');
 const {getWind_WesternPage} =require('./routes/wind-western');
 const {getString_WesternPage} =require('./routes/string-western');
 const {getPercussion_WesternPage} =require('./routes/percussion-western');
 const {getKey_WesternPage} =require('./routes/key-western');
 const {getAboutPage} =require('./routes/About');
 const {getWarrentyPage} =require('./routes/Warrenty');
 const {getImagesPage} =require('./routes/Images');

 


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password! Please go back and login again');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


// Define the static file path
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.use(express.static('./public/assets/img'));

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/home', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
app.get('/show',getShowPage);
app.get('/string-indian',getString_IndianPage);
app.get('/key-indian',getKey_IndianPage);
app.get('/percussion-indian',getPercussion_IndianPage);
app.get('/wind-indian',getWind_IndianPage);
app.get('/wind-western',getWind_WesternPage);
app.get('/key-western',getKey_WesternPage);
app.get('/percussion-western',getPercussion_WesternPage);
app.get('/string-western',getString_WesternPage);
app.get('/about',getAboutPage);
app.get('/warrenty',getWarrentyPage);
app.get('/images',getImagesPage);





// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});