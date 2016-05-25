(function () {
    loader._viewTicket = {
        data:{full_name: "Jen", items:["green eggs", "ham"], id: 3054},
        version: 0,
        getData: function () {
            return data_to_load;
        },
        loadData: function (data) {
            //populate driver list
            $("#listName").text(" ");
            $("ul").empty();
            $("#_viewTicket_numItems").text(" ");
            fullName = data.full_name;
            array = data.items;
            var separatedNames = data.full_name.split(" ");
            for (var i = 0; i < array.length; i++) {

                // item count
                count = array.length;
                //create the contact info(where should I got this, is there a flied relates to contact?
                document.getElementById("listName").innerHTML = separatedNames[0] + "'s Shopping List";
                document.getElementById("phone").innerHTML = "Phone: " + data.contact;
                // Create the list item:
                var newItem = document.createElement('li');
                newItem.innerHTML = array[i];
                newItem.className = 'viewTicketItem';
                $('#_viewTicket_list').prepend(newItem);

                if (count == 1) {
                    $("#_viewTicket_numItems").text("1 item left");
                }
                else {
                    $("#_viewTicket_numItems").text(count + " items left");
                }

                if (count != 0) {
                    $("#_viewTicket_footerInfo, .footerBars").show();
                }
                else {
                    $("#_viewTicket_footerInfo,.footerBars").hide();
                }
            }
        }
    };

    var data_to_load;

    $('#_viewTicket_submit_list').click(function () {
        assholes39();
    });

    function assholes39() {
        var info_to_send = {};
        info_to_send.id = $('#user-name').data('id');
        info_to_send.type = "get";

        //Actual
        $.ajax({
                type: "POST",
                url: "/_viewTicket",
                data: info_to_send,
                success: function (data) {
                    //data is the object sent back on success (could also just be string)

                    data_to_load = {
                        id: data.id,
                        full_name: data.full_name,
                        items: data.items
                    };
                    //alert('data after login: ' + data.full_name);
                },
                error: function (data) {
                    alert("fail");
                    //data is the object send back on fail (could also just be string)
                }
            }
        );
    }

})();

