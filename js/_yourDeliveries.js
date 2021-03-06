(function () {
    var interval;
    loader._yourDeliveries = {
        data: null,
        /*[{name: "wholeFoods", time: "12:00 pm", id: "123", state: "accepted"},
        {name: "ralphs", time: "1:00 pm", id: "234", state: "accepted"},
        {name: "tjs", time: "2:00 pm", id: "234", state: "accepted"},
        {name: "ralphs", time: "3:00 pm", id: "345", state: "shopped"},
        {name: "vons", time: "4:00 pm", id: "665", state: "shopped"},
        {name: "wholeFoods", time: "5:00 pm", id: "342", state: "shopped"},
        {name: "ralphs", time: "6:00 pm", id: "352", state: "shopped"},
        {name: "tjs", time: "7:00 pm", id: "525", state: "delivered"},
        {name: "ralphs", time: "8:00 pm", id: "532", state: "delivered"},
        {name: "vons", time: "9:00 pm", id: "864", state: "delivered"},
        {name: "vons", time: "10:00 pm", id: "864", state: "draft"}],*/ // may not have draft state
        version: 0,
        onPageLoad: function() {
            dataSync135();
            interval = setInterval(dataSync135, 1000);
        },
        onPageLeave: function(){
            clearInterval(interval);
        },
        loadData: function (data) {
            $("#yourDeliveries_accepted_tickets").html("");
            $("#yourDeliveries_shopped_tickets").html("");
            $("#yourDeliveries_delivered_tickets").html("");

            if (data == "none" || (/*data.delivery_history.length == 0 && */data.pending_deliveries.length == 0)) {
                $("#yourDeliveries_accepted_tickets").append('<li class = "ticket"' +
                    '>No deliveries</li>');
                $("#yourDeliveries_shopped_tickets").append('<li class = "ticket"' +
                    '>No deliveries</li>');
                $("#yourDeliveries_delivered_tickets").append('<li class = "ticket"' +
                    '>No deliveries</li>');
                return;
            }

            var tickets = data;
            var accepted_tickets = [];
            var shopped_tickets = [];
            var delivered_tickets = [];
            var extra = [];

            // for (var i = 0; i < tickets.delivery_history.length; i++) {
            //     if (tickets.delivery_history[i].state == 'accepted') {
            //         accepted_tickets.push(tickets.delivery_history[i]);
            //     }
            //     else if (tickets.delivery_history[i].state == 'purchased') {
            //         shopped_tickets.push(tickets.delivery_history[i]);
            //     }
            //     else if (tickets.delivery_history[i].state == 'delivered') {
            //         delivered_tickets.push(tickets.delivery_history[i]);
            //     }
            //     else {
            //         extra.push(tickets.delivery_history[i]);
            //     }
            // }

            for (var i = 0; i < tickets.pending_deliveries.length; i++) {
                if (tickets.pending_deliveries[i].state == 'accepted') {
                    accepted_tickets.push(tickets.pending_deliveries[i]);
                }
                else if (tickets.pending_deliveries[i].state == 'purchased') {
                    shopped_tickets.push(tickets.pending_deliveries[i]);
                }
                else if (tickets.pending_deliveries[i].state == 'delivered') {
                    delivered_tickets.push(tickets.pending_deliveries[i]);
                }
                else {
                    extra.push(tickets.pending_deliveries[i]);
                }
            }

            function toName(nameString) {
                var name = {};
                name['wholeFoods'] = "WholeFoods";
                name['ralphs'] = "Ralph's";
                name['tjs'] = "Sunshine Market";
                name['vons'] = "Vons";

                return name[nameString];
            }

            var ticket;
            for (var i = 0; i < accepted_tickets.length; i++) {
                ticket = accepted_tickets[i];
                $("#yourDeliveries_accepted_tickets").append('<li  data-id="' + ticket._id + '" class = "yourDeliveries1 ' + ticket.store_name + ' ticket" ' + ' ><div  >'
                    + toName(ticket.store_name) + ' <br> Estimate Deliver Time: ' + ticket.time_created +
                    '</div></li>');
            }

            for (var i = 0; i < shopped_tickets.length; i++) {
                ticket = shopped_tickets[i];
                $("#yourDeliveries_shopped_tickets").append('<li  data-id="' + ticket._id + '" class = "yourDeliveries2 ' + ticket.store_name + ' ticket" ' + ' ><div  >'
                    + toName(ticket.store_name) + ' <br> Estimate Deliver Time: ' + ticket.time_created +
                    '</div></li>');
            }

            for (var i = 0; i < delivered_tickets.length; i++) {
                ticket = delivered_tickets[i];
                $("#yourDeliveries_delivered_tickets").append('<li  data-id="' + ticket._id + '" class = "yourDeliveries3 ' + ticket.store_name + ' ticket" ' + ' ><div  >'
                    + toName(ticket.store_name) + ' <br> Estimate Deliver Time: ' + ticket.time_created +
                    '</div></li>');
            }

            if (accepted_tickets.length == 0) {
                $("#yourDeliveries_accepted_tickets").append('<li class = "ticket"' +
                    '>No accepted tickets</li>');
            }
            if (shopped_tickets.length == 0) {
                $("#yourDeliveries_shopped_tickets").append('<li class = "ticket"' +
                    '>No purchased tickets</li>');
            }
            if (delivered_tickets.length == 0) {
                $("#yourDeliveries_delivered_tickets").append('<li class = "ticket"' +
                    '>No deliveries</li>');
            }

            $('li.yourDeliveries1').each(function () {
                $(this).click(function () {
                    loader.ticketId = $(this).data('id');
                    loader._driverList.data = $('li.yourDeliveries1').data('id');
                    goToPage('_driverList');
                });
            });

            $('li.yourDeliveries2').each(function () {
                $(this).click(function () {
                    loader.ticketId = $(this).data('id');
                    loader._driverList.data = $('li.yourDeliveries1').data('id');
                    goToPage('_purchasedTickets');
                });
            });
        }
    };

    $("#yourDeliveries_ticket_btn").click(function(){
        goToPage("_tickets");
    });

    //
    // $('li.yourDeliveries1').each(function () {
    //     $(this).click(function () {
    //         // TODO: Need to know which ticket is sent
    //         loader.ticketId = $(this).data('id');
    //         loader._driverList.data = $('li.yourDeliveries1').data('id');
    //         goToPage('/_driverList');
    //     });
    // });

    // $('#_viewTicket_submit_list').click(function () {
    //     dataSync40();
    //     goToPage("_yourDeliveries");
    //     //dataSync40();
    // });

    function dataSync135() {
        //Actual
        $.ajax({
                type: "POST",
                url: "/_yourDeliveries",
                data: null,
                success: function (data) {
                    //data is the object sent back on success (could also just be string)
                    loader._yourDeliveries.loadData(data);
                },
                error: function (data) {
                    console.log("your deliveries fail");
                    //data is the object send back on fail (could also just be string)
                }
            }
        );
    }

})();

