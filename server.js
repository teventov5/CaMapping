//getting needed libraries

const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

//creating a connection to the mySql database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tom2580Tom',
  database: 'nodelogin'
});


//setting an app variable that will be my way to use express
const app = express();


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/images', express.static(path.join(__dirname, 'images')));

var favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')))


//i need to declare the login route that will output login.html file to the client using a GET request.
//this will be our website first route.

// address to get there: http://localhost:3000/
app.get('/', function(request, response) {
  // Render login template
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/index.html'));
  } else{
    console.log("login page requested");
    response.sendFile(path.join(__dirname + '/login.html'));
  }
});

//Next, i need to add a new route that will authenticate the user infront of the mySql database.


//using this route: http://localhost:3000/auth
app.post('/auth', function(request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        request.session.loggedin = true;
        request.session.username = username;
        // Redirect to home page
        console.log("authentication went succesfully")
        response.redirect('/home');
      } else {
        response.send('Incorrect Username and/or Password!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});


//i can finally create the home route that will output the user's username.

//route for the homePage http://localhost:3000/home
app.get('/home', function(request, response) {
  // If the user is loggedin
  if (request.session.loggedin) {
    //get markers from Db.
    console.log("home page was sent to client")
    response.sendFile(path.join(__dirname + '/index.html'));

  } else {
    response.send('you have to sign in to view the map');
  }
});


///////////////////////////////////////////////////////////////
//in order to set path for registration page

app.get('/register', function(request, response) {
  console.log("user requested registration page")
  response.sendFile(path.join(__dirname + '/register.html'));
});



app.get('/getLocations', function(request, response) {


  connection.query('SELECT * FROM locations',
    function(error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      //checks for error during work with SQL-Server

      //send the resultSet that has the markers to the client

      else {
        console.log("locations were loaded from DB succesfully.");
        response.writeHead(200, {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        });
        var data = JSON.stringify(results);
        response.end(data);
        console.log("markers were sent to client.");
        console.log("////////////////////////////////////////////////");

      };




    })
});





//registers a user into the database

app.post('/regToDb', function(request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  let secretQuestion = request.body.secretQuestion;
  let secretAnswer = request.body.secretAnswer;



  // Ensure the input fields exists and are not empty
  if (username && password) {

    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // means there is already a user with that name
        request.session.canUserRegister = false;
        response.send('Username already exists!');


      } else {

        request.session.canUserRegister = true;
        console.log(request.session.canUserRegister);

        //if no such user in the db

        var sql = "INSERT INTO accounts (`username`, `password`, `secretQuestion`, `secretAnswer`) VALUES (?)";


        var values = [
          username, password, secretQuestion, secretAnswer
        ]
        connection.query(sql, [values], function(err, result) {
          if (err) throw err;
          console.log("new user was entered to the database");
          request.session.loggedin = true;
          request.session.username = username;
          console.log("New user was added to the database")
          console.log("Homepage was sent to the new user ")
          response.redirect('/home');
          response.end();
        })



      };

    })
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});



//handles requests for extended info pages (inside a marker)

app.get('/locations/*', function(request, response) {
  response.sendFile(path.join(__dirname + '/HTML/' + request.params[0] + '.html'));
});


//admin authentication
app.post('/adminAuth', function(request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        request.session.adminLoggedin = true;
        request.session.username = username;
        // Redirect to home page
        console.log("admin authentication went succesfully")
        response.redirect('/adminHome');
      } else {
        response.send('Incorrect admin credentials!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});




app.get('/adminLogin', function(request, response) {
  // Render login template
  if (request.session.adminLoggedin) {
    response.redirect('/adminHome');
  } else{
    console.log("admin login page requested");
    response.sendFile(path.join(__dirname + '/adminLogin.html'));
  }
});


//route for the homePage http://localhost:3000/adminHome
app.get('/adminHome', function(request, response) {
  // If the user is loggedin
  if (request.session.adminLoggedin) {
    console.log("admin home page was sent to client")
    response.sendFile(path.join(__dirname + '/adminIndex.html'));

  } else {
    response.send('you have to sign in as admin to access here');
  }
});


app.get('/addNewLocation', function(request, response) {
  // If the user is loggedin
  if (request.session.adminLoggedin) {
    console.log("user wants to add a new location (will add info to DB and create new HTML file)");
    response.sendFile(path.join(__dirname + '/addNewLocation.html'));

  } else {
    response.send('you have to sign in as admin to access here');
  }
});








////////////////////////////////////////////////////////////////////

//Finally, our Node.js server needs to listen on a port, so for testing purposes, we can use port 3000.

app.listen(3000);
console.log("Server is listening on port 3000...");
