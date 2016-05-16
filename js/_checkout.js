function _checkout() {

    var _checkout = {
        notes:"",
        range1:"",
        range2:""
    };

    $('#submitcheckout').click(function () {

        var valid = false;

        _checkout.notes = $('input[name="specialnotes"]:checked', '#notes').val();
        _checkout.range1 = $("#time1").val();
        _checkout.range2 = $("#time2").val();

        index1 = $("#time1").prop('selectedIndex');

        if ($("#time1").prop('selectedIndex') < $("#time2").prop('selectedIndex')){
            valid = true;
        }


        if (valid == true) {
            sendToServer();
        }
        else {
            confirm("Enter a valid valid time range.");
        }

        loader.next();
    });

    function sendToServer(){
        var info_to_send = {};
        info_to_send.id = $('#user-name').data('id');
        info_to_send.notesTime = _checkout;
        info_to_send.type = "send";

        //Simulation (alert or console.log to check for yourself)
        alert(JSON.stringify(info_to_send));

        //Actual
        $.ajax({
            type: "POST",
            url: "/_checkout",
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

_checkout();