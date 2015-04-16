var nagua_max, nmalta_max, nlupulo_max, nlevadura_max;
var nagua, nmalta, nlupulo, nlevadura;

$('#aceptarValoresIniciales').on('click', function(){

    nagua_max     =     $('#inputMaxAgua').val();
    nmalta_max    =    $('#inputMaxMalta').val();
    nlupulo_max   =   $('#inputMaxLupulo').val();
    nlevadura_max = $('#inputMaxLevadura').val();

    $('#nagua_max').css('width', nagua_max + '%');
    $('#nmalta_max').css('width', nmalta_max + '%');
    $('#nlupulo_max').css('width', nlupulo_max + '%');
    $('#nlevadura_max').css('width', nlevadura_max + '%');

    nagua     =       (nagua_max / 100) * 80; //porque el máx de agua es 80
    nmalta    =      (nmalta_max / 100) * 10; //porque el máx de malta es 10

    nlupulo   =   (nlupulo_max / 100) * 2.00; //porque el máx de lupulo es 2.00
    nlevadura = (nlevadura_max / 100) * 3.00; //porque el máx de levadura el 3.00

    $('#settingsForm').addClass('hidden');
    $('#simulation').removeClass('hidden');

});
