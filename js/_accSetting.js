function accSetting() {
    $('#address').hide();
    $('#payment').hide();
    $('#delete').hide();

    $('.nav-tabs a').on('click', function (e) {
        $('li').removeClass('active');

        e.preventDefault();
        $('#delete').hide();
        $('#address').hide();
        $('#payment').hide();
        $('#home').hide();
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');

        target = $(this).attr('href');

        $('.tab-content > div').not(target).hide();

        $(target).fadeIn(600);

    });

    function sendToServer(){
        var info_to_send = {};
        info_to_send.id = $('#user-name').data('id');
        info_to_send.list = _shopping;
        info_to_send.type = "send";

        //Simulation (alert or console.log to check for yourself)
        alert(JSON.stringify(info_to_send));

        //Actual
        $.ajax({
            type: "POST",
            url: "/_shopping",
            data: info_to_send,
            success: function(data){
                //data is the object sent back on success (could also just be string)
                alert("Congrats!");
            },
            fail: function(data){
                //data is the object send back on fail (could also just be string)
            }
        });
    }
}

accSetting();