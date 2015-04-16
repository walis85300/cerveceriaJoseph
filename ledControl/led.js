var Cylon = require('cylon');

module.exports = function(app){

Cylon.robot({

		connections: {
			raspi: {adaptor: 'raspi'}
		},

		devices: {

			led_maceracion: {driver: 'led', pin: 11},
			led_filtrado1: {driver: 'led', pin: 12},
			led_hervido: {driver: 'led', pin: 13},
			led_centrifugado: {driver: 'led', pin: 15},
			led_enfriamiento: {driver: 'led', pin: 16},
			led_ferme_madu: {driver: 'led', pin: 18},
			led_filtrado2: {driver: 'led', pin: 22},
		},

		work: function(my){

			app.route('/api/:led/:position').get(function(req, res, next){
				var led = req.params.led,
					pos = req.params.position;

				console.log(led);
				console.log(pos);

				if (pos === 'on' ) {

					if ( led === 'maceracion' || led === 'all')
						my.led_maceracion.turnOn();
					if ( led === 'filtrado1' || led === 'all')
						 my.led_filtrado1.turnOn();
					if ( led === 'hervido' || led === 'all')
						 my.led_hervido.turnOn();
					if ( led === 'centrifugado' || led === 'all')
						 my.led_centrifugado.turnOn();
					if ( led === 'enfriamiento' || led === 'all')
					   my.led_enfriamiento.turnOn();
					if ( led === 'ferme_madu' || led === 'all')
					   my.led_ferme_madu.turnOn();
					if ( led === 'filtrado2' || led === 'all')
						my.led_filtrado2.turnOn();

				} else {

					if ( led === 'maceracion' || led === 'all')
						my.led_maceracion.turnOff();
					if ( led === 'filtrado1' || led === 'all')
						my.led_filtrado1.turnOff();
					if ( led === 'hervido' || led === 'all')
						my.led_hervido.turnOff();
					if ( led === 'centrifugado' || led === 'all')
						my.led_centrifugado.turnOff();
					if ( led === 'enfriamiento' || led === 'all')
						my.led_enfriamiento.turnOff();
					if ( led === 'ferme_madu' || led === 'all')
						my.led_ferme_madu.turnOff();
					if ( led === 'filtrado2' || led === 'all')
						my.led_filtrado2.turnOff();

				}

				res.sendStatus(200);

			});

		}

	}).start();
};
