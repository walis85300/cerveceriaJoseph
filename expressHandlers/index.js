module.exports = function(app, handlebars){

	require('./setters')(app, handlebars);
	require('./handlingRoutes')(app);

};
