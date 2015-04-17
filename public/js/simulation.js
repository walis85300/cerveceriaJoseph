var enviar_agua = 1,
    enviar_malta = 1,
    enviar_maceracion = 0,
    enviar_filtrado = 0,
    enviar_lupulos = 0,
    enviar_centrifugado = 0,
    enviar_levadura = 0;

var nmaceracion = 0,
    nfiltrado = 0,
    nhervido = 0,
    ncentrifugado = 0,
    nenfriamiento = 0,
    nfiltrado_final = 0,
    ncerveza = 0,
    nfermentacion_maduracion = 0;

var terminoPrimerProceso = 1;

var encendido = 0,
    nmaceracion_activo = 0,
    nfiltrado_activo = 0,
    nhervido_activo = 0,
    nenfriamiento_activo = 0,
    nfermentacion_maceracion_activo = 0,
    ncerveza_activo = 0,
    proceso_terminado = 0,
    nfiltrado_final_activo = 0;

var nmaceracion_hervido = 100,
    proceso_filtrar = 100,
    nhervido_hervido = 100,
    ncentrifugado_activo = 0,
    ncentri_eliminar_grano = 5,
    proceso_enfriar = 100,
    proceso_fermentacion_maduracion = 13, //Para que el tiempo final sea una suma de ambos procesos
    proceso_filtrado_final = 3;


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
                toastr["success"]("Se virtió toda el agua");
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
                toastr["success"]("Se virtió toda la malta");
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
                toastr["success"]("Terminó hervido de maceración");
                toastr["info"]("Comienza envió de maceración a filtrado");
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
                toastr["success"]("Se terminó de enviar la maceración");
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
                toastr["success"]("Se terminó el primer filtrado");
                toastr["info"]("Comienza envío de maceración filtrada a vertido de lúpulo");
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
                toastr["success"]("Terminó envío de filtrado");
                toastr["info"]("Comienza vertido de lúpulos");
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
                toastr["success"]("Se terminó de verter el lúpulo");
                toastr["info"]("Comienza el hervido");
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
                toastr["success"]("Finalizó el hervido");
                toastr["info"]("Comienza hervido a centrifugado");
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
        //Proceso 4: Centrifugado
        if (ncentrifugado_activo === 1) {
          //Se traslada el centrifugado
            if (nhervido > 0) {
                nhervido = nhervido - 0.7;
                ncentrifugado = ncentrifugado + 0.7;
                $('#nhervido').css('width', (nhervido / 90 * 100) + '%');
                $('#ncentrifugado').css('width', (ncentrifugado / 90 * 100) + '%');
             //Se extraen los granos
             }else if(ncentri_eliminar_grano > 0){
                ncentrifugado = ncentrifugado - ncentrifugado *0.00035;
                ncentri_eliminar_grano = ncentri_eliminar_grano - ncentrifugado *0.00035;
             }
             //Se termina el proceso
            if(!(nhervido > 0) && !(ncentri_eliminar_grano > 0)){
              ncentrifugado_activo = 0;
              enviar_centrifugado = 1;
              toastr["success"]("Se terminó el centrifugado");
              toastr["info"]("Comienza envío para enfriamiento");
              $('#ncentrifugadoContainer p').removeClass('bg-success').addClass('bg-danger');
              $('#nenfriamientoContainer p').removeClass('bg-info').addClass('bg-success');


              $.get('/api/centrifugado/off', function(data){
                console.log(data);
              });
              $.get('/api/enfriamiento/on', function(data){
                console.log(data);
              });
              console.log("Inicia el proceso de enfriamiento");
            }

        }
        //Fin proceso 4

        //PROCESO 5: ENFRIAMIENTO

        //se traslada el centrifugado
        if (enviar_centrifugado === 1) {
            if (ncentrifugado > 0.3) {
                nenfriamiento = nenfriamiento + 0.7;
                ncentrifugado = ncentrifugado - 0.7;
                $('#ncentrifugado').css('width', (ncentrifugado / 90 * 100) + '%');
                $('#nenfriamiento').css('width', (nenfriamiento / 93 * 100) + '%');

            } else {
                enviar_centrifugado = 0;
                enviar_levadura = 1;
                toastr["success"]("Terminó envío");
                toastr["info"]("Comienza vertido de levadura");
            }
        }

        //se vierte la levadura
        if (enviar_levadura === 1) {
            if (nlevadura > 0.02) {
                nlevadura = nlevadura - 0.02;
                nenfriamiento = nenfriamiento + 0.02;
                $('#nenfriamiento').css('width', (nenfriamiento / 93 * 100) + '%');
                $('#nlevadura_max').css('width', (nlevadura / 3 * 100) + '%');

            } else {
                enviar_levadura = 0;
                nenfriamiento_activo = 1;
                toastr["success"]("Se virtió la levadura");
                toastr["info"]("Comienza enfriamiento");
            }
        }

        //Se empieza con el enfriamiento
        if (nenfriamiento_activo === 1) {
            if (proceso_enfriar > 0) {
                proceso_enfriar = proceso_enfriar - 1;
            } else {
                nenfriamiento_activo = 0;
                nfermentacion_maceracion_activo = 1;

                $.get('/api/enfriamiento/off', function(data){
                    console.log(data);
                });
                $.get('/api/ferme_madu/on', function(data){
                    console.log(data);
                });

                $('#nenfriamientoContainer p').removeClass('bg-success').addClass('bg-danger');
                $('#nfermentacion_maduracionContainer p').removeClass('bg-info').addClass('bg-success');
                toastr["success"]("Terminó enfriamiento");
                toastr["info"]("Comienza envío para fermentación y maduración");
            }
        }

        //ENFRIAMIENTO (OFF)
        //Proceso de fermentación y maduración
        //Asumo que entra a un proceso mas pequeño en donde se hacen ambos
        if (nfermentacion_maceracion_activo === 1) {
          if (nenfriamiento > 0) {
            nenfriamiento = nenfriamiento - 0.7;
            nfermentacion_maduracion = nfermentacion_maduracion + 0.7;

            $('#nenfriamiento').css('width', (nenfriamiento / 90 * 100) + '%');
            $('#nfermentacion_maduracion').css('width', (nfermentacion_maduracion / 90 * 100) + '%');
          }else if(proceso_fermentacion_maduracion > 0){
            proceso_fermentacion_maduracion = proceso_fermentacion_maduracion - nfermentacion_maduracion *0.00030; //Para que el tiempo final sea una suma de ambos procesos
          }
          //Finalizan ambos procesos
          if(!(ncentrifugado > 0) && !(proceso_fermentacion_maduracion > 0)){
            toastr["success"]("Se fermentó y maduró, ya casi es cerveza");
            toastr["info"]("Comienza filtrado final");
            nfermentacion_maceracion_activo = 0;
            nfiltrado_final_activo = 1;
            $('#nfermentacion_maduracionContainer p').removeClass('bg-success').addClass('bg-danger');
            $('#nfiltradoFinalContainer p').removeClass('bg-info').addClass('bg-success');

            $.get('/api/enfriamiento/off', function(data){
              console.log(data);
            });
            $.get('/api/filtrado2/on', function(data){
              console.log(data);
            });
            console.log("Inicia el proceso de filtrado final");
          }
        }
        //Fin proceso de fermentación y maduración

        //Proceso de filtrado final

        if (nfiltrado_final_activo === 1) {
          if (nfermentacion_maduracion > 0) {
            nfermentacion_maduracion = nfermentacion_maduracion - 0.7;
            nfiltrado_final = nfiltrado_final + 0.7;

            $('#nfiltrado_final').css('width', (nfiltrado_final / 90 * 100) + '%');
            $('#nfermentacion_maduracion').css('width', (nfermentacion_maduracion / 90 * 100) + '%');
          }else if(proceso_filtrado_final > 0){
            //Proceso de eliminación de los granos finales
            proceso_filtrado_final = proceso_filtrado_final - nfiltrado_final *0.00015;
          }
          //Finaliza el proceso de eliminación de los granos
          if(!(nfermentacion_maduracion > 0) && !(proceso_filtrado_final > 0)){

            nfiltrado_final_activo = 0;
            ncerveza_activo = 1;
            proceso_terminado = 1;
            $('#ncervezaContainer p').removeClass('bg-info').addClass('bg-success');
            $('#nfiltradoFinalContainer p').removeClass('bg-success').addClass('bg-danger');

            $.get('/api/filtrado2/off', function(data){
              console.log(data);
            });
            $.get('/api/all/on', function(data){
              console.log(data);
            });
            toastr["success"]("Ya tenemos cerveza");
          }
        }
        //Fin proceso de filtrado final

        //Proceso de traslado a último tanque
        if (nfiltrado_final > 0 && ncerveza_activo === 1) {
          nfiltrado_final = nfiltrado_final - 0.7;
          ncerveza = ncerveza + 0.7;
          $('#nfiltrado_final').css('width', (nfiltrado_final / 90 * 100) + '%');
          $('#ncerveza').css('width', (ncerveza / 90 * 100) + '%');
        }else if(proceso_terminado === 1){
          clearInterval(interval);
        }
        //Fin proceso de proceso de traslado

    }
},100);




$('#iniciar').on('click', function(){
    $(this).addClass('disabled');
    $.get('/api/maceracion/on');
    $('#nmaceracionContainer p').removeClass('bg-info').addClass('bg-success');
    encendido = 1;
});
