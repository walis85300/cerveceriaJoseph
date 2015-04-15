module.exports = function(app, handlebars){
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
    app.set('port', process.env.PORT || 8080);
};
