(function () {
    loader._shopping = {
        // data: "none",
        data: null,
        version: 0,
        getData: function () { //must be null if not needed 
            return list_shopping;
        },
        loadData: function (data) {
            if (data == null || data == "none" || data.length == 0) {
                data = [];
                list_shopping.splice(0, list_shopping.length);
                $("#footerInfo").hide();
            }

            shopping_count = 0;
            $("#shopping_list").html("");
            $("#shoppingCheckListItem").val("");

            for (var i = 0; i < data.length; i++) {
                shoppping_toAdd = data[i];
                var newItem = document.createElement('li');
                newItem.innerHTML = shoppping_toAdd;
                newItem.className = 'item';
                $("#shopping_list").prepend(newItem);
                list_shopping.push(shoppping_toAdd);
                shopping_count++;

                if (shopping_count == 1) {
                    $("#shopping_numItems").text("1 item");
                }
                else {
                    $("#shopping_numItems").text(shopping_count + " items");
                }

                if (shopping_count != 0) {
                    $("#footerInfo, #shopping_submit_list").show();
                }
                else {
                    $("#footerInfo").hide();
                }
            }
        }
    };

    var shopping_count = 0;
    var shoppping_toAdd;
    var list_shopping = [];

    $("#shopping_submit_list").hide();
    $('#shopping_submit_list').click(function () {
        if (list_shopping.length > 0) {
            loader._shopping.data = list_shopping;
            goToPage("_checkout");
        }
    });

    $('#shopping_list_form').submit(
        function addItem() {

            if ($('#shoppingCheckListItem').val() !== '') {
                shoppping_toAdd = $('#shoppingCheckListItem').val();
                var newItem = document.createElement('li');
                newItem.innerHTML = shoppping_toAdd;
                newItem.className = 'item';
                //newItem.append "<button>delete</button>";
                $('#shopping_list').prepend(newItem);
                shopping_count++;
                loader._shopping.version++; //Trivi add this
                loader.shoppingChanged = true;
                if (shopping_count == 1) {
                    $("#shopping_numItems").text("1 item");
                }
                else {
                    $("#shopping_numItems").text(shopping_count + " items");
                }

                if (shopping_count != 0) {
                    $("#footerInfo, #shopping_submit_list").show();
                }
                else {
                    $("#footerInfo").hide();
                }
                event.preventDefault();
                $('#shoppingCheckListItem').val('');

                list_shopping.push(shoppping_toAdd);
            }
            else {
                event.preventDefault();
            }
        }
    );

    //remove item
    $(document).on('click', '.item', function () {
        $(this).remove();
        $('#shopping_submit_list').hide();
        shopping_count--;
        loader._shopping.version++; //Trivi add this
        loader.shoppingChanged = true;
        if (shopping_count == 1) {
            $("#shopping_numItems").text("1 item");
        }
        else if (shopping_count == 0) {
            $("#shopping_numItems").text("");
        }
        else {
            $("#shopping_numItems").text(shopping_count + " items");
        }

        if (shopping_count != 0) {
            $("#shopping_submit_list, #footerInfo").show();
        }

        var index = list_shopping.indexOf($(this).text());
        if (index > -1) {
            list_shopping.splice(index, 1);
        }
    });

    $("#shopping-back").click(function () {
        goToPage("_homePage");
    });
})();   
