var enviar_agua = 1,
    enviar_malta = 1,
    enviar_maceracion = 0,
    enviar_filtrado = 0,
    enviar_lupulos = 0;

var nmaceracion = 0,
    nfiltrado = 0,
    nhervido = 0;

var encendido = 0,
    nmaceracion_activo = 0,
    nfiltrado_activo = 0,
    nhervido_activo = 0;

var nmaceracion_hervido = 100,
    proceso_filtrar = 100,
    nhervido_hervido = 100;

var interval = setInterval(function(){

    if (encendido === 1){


        //PROCESO 1: MACERACION (ON){

        //Se vierte el agua dentro del tanque de maceracion
        if (enviar_agua === 1) {
            if (nagua > 0.1){
                nagua = nagua - 0.8;
                nmaceracion = nmaceracion + 0.8;
            } else {
                enviar_agua = 0;
                $.get('/api/maceracion/off', function(data){
                    console.log(data);
                });
            }
        }

        //Se vierte la malta dentro del tanque de maceracion
        if (enviar_malta === 1) {
            if (nmalta > 0.1) {
                nmalta = nmalta - 0.1;
                nmaceracion = nmaceracion + 0.1;
            } else {
                enviar_malta = 0;
            }
        }

        if (enviar_agua===0 && enviar_malta===0) {
            //Ya se virtió toda el agua y la malta
            console.log('tanque maceracion lleno');
            console.log('empieza hervido');
            nmaceracion_activo = 1;
        } else {
            $('#nagua_max').css('width', (nagua / 80 * 100) + '%');
            $('#nmalta_max').css('width', (nmalta * 10 ) + '%');
        }

        //Se hierve la mezcla y se resta la pérdida
        if (nmaceracion_activo === 1) {
            if (nmaceracion_hervido > 1.5) {
                nmaceracion = nmaceracion -
                    (nmaceracion * 0.0001);
                nmaceracion_hervido = nmaceracion_hervido - 1.5;
            } else {
                //Ya se hirvió la primera mezcla
                nmaceracion_activo = 0;
                enviar_maceracion = 1;
                console.log('termino hervido de maceracion');
                console.log('comienza envio de maceracion a filtrado');
            }
        }
        //MACERACION (OFF)

        //PROCESO 2: PRIMER FILTRADO (ON)

        //Se envia la maceracion al filtrado
        if (enviar_maceracion === 1) {
            if (nmaceracion > 1.5) {
                nfiltrado = nfiltrado + 0.8;
                nmaceracion = nmaceracion - 0.8;
            } else {
                //Se terminó de trasladar la maceración para el filtrado
                enviar_maceracion = 0;
                nfiltrado_activo = 1;
            }
        }

        //Se filtra la primera vez
        if (nfiltrado_activo === 1) {
            if (proceso_filtrar > 0) {
                nfiltrado = nfiltrado - (nfiltrado * 0.00035);
                proceso_filtrar = proceso_filtrar - 1;
            } else {
                //Terminó el primer filtrado
                nfiltrado_activo = 0;
                enviar_filtrado = 1;
            }
        }

        //PRIMER FILTRADO (OFF)

        //PROCESO 3: VERTIDO DE LUPULOS

        //Se traslada el filtrado hacia el tanque de hervido
        if (enviar_filtrado === 1) {
            if (nfiltrado > 0.1) {
                nfiltrado = nfiltrado - 0.7;
                nhervido = nhervido + 0.7;
            } else {
                //Termino el envió se activa el vertido de lúpulos
                enviar_filtrado = 0;
                enviar_lupulos = 1;
            }
        }

        //Se vierten los lúpulos a la mezcla
        if (enviar_lupulos === 1) {
            if (nlupulo > 0.02){
                nlupulo = nlupulo - 0.01;
                nhervido = nhervido + 0.01;
            } else {
                //se terminó de verter el lúpulo se hierve la mezcla
                enviar_lupulos = 0;
                nhervido_activo = 1;
            }
        }

        //Se hierve la mezcla con los lupulos
        if (nhervido_activo === 1) {
            if (nhervido_hervido > 0) {
                nhervido_hervido = nhervido_hervido - 1;
                nhervido = nhervido - (nhervido * 0.00035);
            } else {
                //Ya terminó de hervir
                nhervido_activo = 0;
            }
        }

    }
},200);




$('#iniciar').on('click', function(){
    $(this).addClass('disabled');
    $.get('/api/maceracion/on');
    encendido = 1;
});
