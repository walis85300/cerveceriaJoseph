//Server

var express = require('express');
var app = express();
var handlebars = require('express-handlebars')
	            .create({defaultLayout: 'main'});
app.use(express.static(__dirname + '/public'));

require('./expressHandlers/setters.js')(app, handlebars);
// require('./expressHandlers/handlingRoutes.js')(app);

app.get('/', function(res, res){
	res.render('home');
});

app.get('/simulation', function(req, res){
	res.render('simulation');
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/test', function(req, res){
	res.render('test');
});

app.route('/api/:led/:pos').get(function(req, res, next){
	console.log(req.params.led);
	console.log(req.params.pos);

	res.sendStatus(200);
});

app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});



app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:'+app.get('port'));
});
