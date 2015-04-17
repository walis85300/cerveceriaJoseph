
module.exports = function(app){

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

<<<<<<< HEAD
//    require('../ledControl/led.js')(app);
=======
    // require('../ledControl/led.js')(app);
>>>>>>> def5c25a308b52030858274d9eacae813c6240a5

    app.use(function(req, res, next){
    	res.status(404);
    	res.render('404');
    });



};
