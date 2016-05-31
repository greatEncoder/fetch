(function(){
    loader._congrats_driver_finish_shopping = {
        data: null
    };

    $("#congrats_end_shopping_to_delivery").click(function(){
        updateTicketToDelivered();
        goToPage("_yourDeliveries");
    });

    function updateTicketToDelivered() {
        $.ajax({
            type: "POST",
            url: "/updatePurchasedTickets",
            data: {
                ticketId: loader.ticketId
            },
            success: function () {
            },
            error: function (data) {
                //data is the object send back on fail (could also just be string)
            }
        });
    }
})();