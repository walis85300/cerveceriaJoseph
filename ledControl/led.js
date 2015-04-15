//Aqui se hara la manipulacion de los leds

var Cylon = require('cylon');

module.exports = function(app){

  // Cylon.robot({
  //   connections
  // });

  app.route('/api/:led/:position').get(function(req, res, next){

      //Escribe la programacion para ON/OFF leds

  });


};
