var enviar_agua = 1,
    enviar_malta = 1,
    enviar_maceracion = 0,
    enviar_filtrado = 0,
    enviar_lupulos = 0;
    enviar_centrifugado = 0;

var nmaceracion = 0,
    nfiltrado = 0,
    nhervido = 0;
    ncentrifugado = 0;

var terminoPrimerProceso = 1;

var encendido = 0,
    nmaceracion_activo = 0,
    nfiltrado_activo = 0,
    nhervido_activo = 0;

var nmaceracion_hervido = 100,
    proceso_filtrar = 100,
    nhervido_hervido = 100;
    ncentrifugado_activo = 0;
    ncentri_eliminar_grano = 10;


var interval = setInterval(function(){

    if (encendido === 1){

        //PROCESO 1: MACERACION (ON){

        //Se vierte el agua dentro del tanque de maceracion
        if (enviar_agua === 1) {
            if (nagua > 0.1){
                nagua = nagua - 0.8;
                nmaceracion = nmaceracion + 0.8;
                $('#nmaceracion').css('width', (nmaceracion / 90 * 100) + '%');
            } else {
                enviar_agua = 0;
                console.log('no mas agua');

            }
        }

        //Se vierte la malta dentro del tanque de maceracion
        if (enviar_malta === 1) {
            if (nmalta > 0.1) {
                nmalta = nmalta - 0.1;
                nmaceracion = nmaceracion + 0.1;
                $('#nmaceracion').css('width', (nmaceracion / 90 * 100) + '%');
            } else {
                enviar_malta = 0;
                console.log('no mas malta');
            }
        }

        if ((enviar_agua === 0 && enviar_malta === 0) && terminoPrimerProceso === 1) {
            //Ya se virtió toda el agua y la malta
            console.log('tanque maceracion lleno');
            console.log('empieza hervido');
            nmaceracion_activo = 1;
            terminoPrimerProceso = 0;
        } else if(terminoPrimerProceso===1) {
            $('#nagua_max').css('width', (nagua / 80 * 100) + '%');
            $('#nmalta_max').css('width', (nmalta * 10 ) + '%');
        }

        //Se hierve la mezcla y se resta la pérdida
        if (nmaceracion_activo === 1) {
            if (nmaceracion_hervido > 1.5) {
                nmaceracion = nmaceracion -
                    (nmaceracion * 0.0001);
                $('#nmaceracion').css('width', (nmaceracion / 90 * 100) + '%');
                nmaceracion_hervido = nmaceracion_hervido - 1.5;
            } else {
                //Ya se hirvió la primera mezcla
                nmaceracion_activo = 0;
                enviar_maceracion = 1;
                $('#nmaceracionContainer p').removeClass('bg-success').addClass('bg-danger');
                $('#nfiltradoContainer p').removeClass('bg-info').addClass('bg-success');
                $.get('/api/maceracion/off', function(data){
                    console.log(data);
                });
                $.get('/api/filtrado1/on', function(data){
                    console.log(data);
                });
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
                $('#nfiltrado').css('width', (nfiltrado / 90 * 100) + '%');
                nmaceracion = nmaceracion - 0.8;
                $('#nmaceracion').css('width', (nmaceracion / 90 * 100) + '%');
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
                $('#nfiltrado').css('width', (nfiltrado / 90 * 100) + '%');
                proceso_filtrar = proceso_filtrar - 1;
            } else {
                //Terminó el primer filtrado
                nfiltrado_activo = 0;
                enviar_filtrado = 1;
                $('#nfiltradoContainer p').removeClass('bg-success').addClass('bg-danger');
                $('#nhervidoContainer p').removeClass('bg-info').addClass('bg-success');
                $.get('/api/filtrado1/off', function(data){
                    console.log(data);
                });
                $.get('/api/hervido/on', function(data){
                    console.log(data);
                });
            }
        }

        //PRIMER FILTRADO (OFF)

        //PROCESO 3: VERTIDO DE LUPULOS

        //Se traslada el filtrado hacia el tanque de hervido
        if (enviar_filtrado === 1) {
            if (nfiltrado > 0.1) {
                nfiltrado = nfiltrado - 0.7;
                nhervido = nhervido + 0.7;
                $('#nfiltrado').css('width', (nfiltrado / 90 * 100) + '%');
                $('#nhervido').css('width', (nhervido / 90 * 100) + '%');
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
                $('#nlupulo').css('width', (nhervido / 92 * 100) + '%');
                $('#nlupulo_max').css('width', (nlupulo / 2 * 100) + '%');

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
                $('#nlupulo').css('width', (nhervido / 92 * 100) + '%');
            } else {
                //Ya terminó de hervir
                nhervido_activo = 0;
                ncentrifugado_activo = 1;
                $('#nhervidoContainer p').removeClass('bg-success').addClass('bg-danger');
                $('#ncentrifugadoContainer p').removeClass('bg-info').addClass('bg-success');

                $.get('/api/hervido/off', function(data){
                    console.log(data);
                });
                $.get('/api/centrifugado/on', function(data){
                  console.log(data);
                });
            }
        }
        if (ncentrifugado_activo === 1) {
            if (nhervido > 0) {
                nhervido = nhervido - 0.7;
                ncentrifugado = ncentrifugado + 0.7;
                console.log(nhervido);
                $('#nhervido').css('width', (nhervido / 90 * 100) + '%');
                $('#ncentrifugado').css('width', (ncentrifugado / 90 * 100) + '%');
             }else if(ncentri_eliminar_grano > 0){
                ncentrifugado = ncentrifugado - ncentrifugado *0.00035;
                ncentri_eliminar_grano = ncentri_eliminar_grano - ncentrifugado *0.00035;
                console.log(ncentri_eliminar_grano);
             }

            if(!(nhervido > 0) && !(ncentri_eliminar_grano > 0)){
              console.log("HOLA");
              ncentrifugado_activo = 0;

              $('#ncentrifugadoContainer p').removeClass('bg-success').addClass('bg-danger');
              $('#nenfriamientoContainer p').removeClass('bg-info').addClass('bg-success');


              $.get('/api/centrifugado/off', function(data){
                console.log(data);
              });
              $.get('/api/enfriamiento/on', function(data){
                console.log(data);
              });
            }

        }



    }
},100);




$('#iniciar').on('click', function(){
    $(this).addClass('disabled');
    $.get('/api/maceracion/on');
    $('#nmaceracionContainer p').removeClass('bg-info').addClass('bg-success');
    encendido = 1;
});
