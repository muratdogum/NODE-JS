const mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const { start } = require('repl');
const res = require('express/lib/response');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});

var app = express();


var ad = "";
var uyarı = false;
var uyarı2 = false;
var uyarı3 = false;
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/homepage.html'));
    } else {
        request.session.loggedin = false;
        response.sendFile(path.join(__dirname + '/index.html'));
    }


});

app.get('/login', function(request, response) {
    if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/homepage.html'));
    } else {
        response.sendFile(path.join(__dirname + '/login.html'));
    }
});
app.get('/register', function(request, response) {
    if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/homepage.html'));
    } else {
        response.sendFile(path.join(__dirname + '/register.html'));
    }
});
app.get('/logout', function(request, response) {
    request.session.loggedin = false;
    response.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/homepage.html'));
    } else {
        response.sendFile(path.join(__dirname + '/login.html'));
    }

});
app.get('/data', function(request, response) {
    response.send(ad);
    response.end();
});
app.post('/res', function(request, response) {
    if (uyarı) {
        response.send("1");
    }
    if (uyarı2) {
        response.send("2");
    }
    if (uyarı3) {
        response.send("3");
    }
    response.end();
});
app.post('/auth', function(request, response) {
    var email = request.body.email;
    var password = request.body.password;
    if (email && password) {
        connection.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
            if (results.length > 0) {

                for (var i = 0; i < results.length; i++) {
                    ad = results[i].username;
                    if (password == results[i].password) {
                        request.session.loggedin = true;
                        uyarı = false;

                        response.redirect('/home');
                    } else {
                        uyarı3 = true;
                        response.redirect('/login');
                    }

                }




            } else {
                uyarı = true;
                response.redirect('/register');
            }
            response.end();
        });
    } else {
        response.redirect('/login');
        response.end();
    }
});
app.post('/crud', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;

    if (username && password && email) {
        if (username.length > 5 && password.length > 5) {

            connection.query('INSERT INTO users (username, password,email) VALUES (?,?,?)', [username, password, email], function(error, results, fields) {
                uyarı2 = false;
                response.redirect('/login');
                response.end();

            });
        } else {
            uyarı2 = true;
            response.redirect('/register');
            response.end();
        }
    } else {
        response.redirect('/login');
        response.end();
    }
})


app.listen(8000);