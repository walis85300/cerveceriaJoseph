

$('#aceptarValoresIniciales').on('click', function(){

    var maxAgua = $('#inputMaxAgua');
    var maxAgua1 = $('#inputMaxAgua1');
    var maxAgua2 = $('#inputMaxAgua2');
    var maxAgua3 = $('#inputMaxAgua3');

    console.log(maxAgua.val());
    console.log(maxAgua1.val());
    console.log(maxAgua2.val());
    console.log(maxAgua3.val());

    maxAgua.prop('disabled', true);
    maxAgua1.prop('disabled', true);
    maxAgua2.prop('disabled', true);
    maxAgua3.prop('disabled', true);

});
