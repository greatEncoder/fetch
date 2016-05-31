(function () {
    loader._rateDriver = {
        data: {driver_full_name: "Jane Doe", driverId: 133, rate: 5},
        getData: function(){
            var dataSendBack = {
                driver_full_name: data.full_name,
                driverId: data.userId,
                rate: _rating
            };
            return dataSendBack;
        },
        loadData: function (data) {
            var drImage = $('#driver-image');
            $("#driver-name_rateDriver").html("");
            drImage.data('src', "/placeholder/person.png");

            var separatedNames = data.driver_full_name;
            document.getElementById("driver-name_rateUser").innerHTML = separatedNames;


            var imageSrc = "Images/users/" + data.driverId + ".png";

            if (imageSrc !== null) {
                drImage.data('src', imageSrc);
            }
        }
    };


    $(".driverRate_button").click(function(){
        changeTicketState();
        goToPage("_congratsTicketClosed");
    });


    var _rating = 0;
    var r1 = $('#driver_rating-1'), r2 = $('#driver_rating-2'), r3 = $('#driver_rating-3'), r4 = $('#driver_rating-4'), r5 = $('#driver_rating-5');
    r1.hover(function () {
        r1.addClass("selected");
        r2.removeClass("selected");
        r3.removeClass("selected");
        r4.removeClass("selected");
        r5.removeClass("selected");
        _rating = 1;
    });
    r2.hover(function () {
        r1.addClass("selected");
        r2.addClass("selected");
        r3.removeClass("selected");
        r4.removeClass("selected");
        r5.removeClass("selected");
        _rating = 2;
    });
    r3.hover(function () {
        r1.addClass("selected");
        r2.addClass("selected");
        r3.addClass("selected");
        r4.removeClass("selected");
        r5.removeClass("selected");
        _rating = 3;
    });
    r4.hover(function () {
        r1.addClass("selected");
        r2.addClass("selected");
        r3.addClass("selected");
        r4.addClass("selected");
        r5.removeClass("selected");
        _rating = 4;
    });
    r5.hover(function () {
        r1.addClass("selected");
        r2.addClass("selected");
        r3.addClass("selected");
        r4.addClass("selected");
        r5.addClass("selected");
        _rating = 5;
    });



    function changeTicketState() {
        $.ajax({
            type: "POST",
            url: "/_purchasedTickets",
            data: {
                ticketId: loader.ticketId,
                type: 'send'
            },
            success: function (data) {
                console.log('Successfully changed ticket state to delivered');
            },
            error: function (data) {
                console.log('GOT IN ERROR IN PURCHASEDDDAG');
                //data is the object send back on fail (could also just be string)
            }
        });
    }

})();
/**
 * Created by juneruijiang on 5/24/16.
 */
/**
 * Created by juneruijiang on 5/25/16.
 */
