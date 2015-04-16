
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

    app.use(function(req, res, next){
        res.status(404);
        res.render('404');
    });

    require('../ledControl/led.js')(app);

};
