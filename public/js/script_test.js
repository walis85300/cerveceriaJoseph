$('.btn').on('click', function(){

    var led = $(this).attr('id');

    if($(this).hasClass('pressed')) {

        $(this).removeClass('pressed')
            .removeClass('btn-default')
            .addClass('btn-primary');

        $.get('/api/' + led + '/off', function(data){
            toastr["success"](led + ' on ' + data);
        });

    } else {

        $(this).addClass('pressed')
            .removeClass('btn-primary')
            .addClass('btn-default');

        $.get('/api/' + led + '/on', function(data){
            toastr["success"](led + ' off ' + data);
        });

        console.log('encendio ' + $(this).attr('id'));
    }

});
