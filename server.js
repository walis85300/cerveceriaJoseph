//Server

var express = require('express');
var app = express();
var handlebars = require('express-handlebars')
	            .create({defaultLayout: 'main'});

app.use(express.static(__dirname + '/public'));

require('./expressHandlers/setters.js')(app, handlebars);
require('./expressHandlers/handlingRoutes.js')(app);


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:'+app.get('port'));
});
