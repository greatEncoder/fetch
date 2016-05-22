/**
 * Created by tylercuddy on 5/17/16.
 */
/**
 * Created by tylercuddy on 5/17/16.
 */



(function () {
    // item count
    var count = 0;
    
    var simulated_user = {
        id: 1234567,
        name: "Donkey",
        items: ["aa", "bb", "cc", "dd"],
        contact: 1234567890
    };

    displayLoadedData(simulated_user);

    function displayLoadedData(data) {
        document.getElementById("listName").innerHTML = data.name + "'s Shopping List";
        document.getElementById("phone").innerHTML = "Phone: " + data.contact;
    }

    $("#_driver_footerInfo, #footerBars").show();

    makeList(simulated_user.items);

    function makeList(array) {
        //populate driver list
        for (var i = 0; i < array.length; i++) {
            // Create the list item:
            var newItem = document.createElement('li');
            newItem.innerHTML = array[i];
            newItem.className = 'driverItem';
            $('#_driverList2_list').prepend(newItem);
            count++;
            if (count == 1) {
                $("#_driver_numItems").text("1 item left");
            }
            else {
                $("#_driver_numItems").text(count + " items left");
            }

            if (count != 0) {
                $("#_driver_footerInfo, .footerBars").show();
            }
            else {
                $("#_driver_footerInfo,.footerBars").hide();
            }
        }
    }

    $(document).on('click', '.driverItem',function () {

        $(this).toggleClass("selected");

        arr = [];
        $('.driverItem.selected').each(function () {
            arr.push($(this).text());
        });

        if ((count - arr.length) === 1) {
            $("#_driver_numItems").text("1 item left");
        }
        else {
            $("#_driver_numItems").text((count - arr.length) + " items left");
        }
    });

    $("#_driver_submit_list").click(function () {
        arr = [];
        $('.driverItem.selected').each(function () {
            arr.push($(this).text());
        });

        if (arr.length != count) {
            if ((count - arr.length) === 1) {
                var flag = confirm("You still have " + (count - arr.length) + " item left in the" +
                    " shopping list, Are you sure to finish shopping now?");
            }
            else {
                var flag = confirm("You still have " + (count - arr.length) + " items left in the" +
                    " shopping list, Are you sure to finish shopping now?");
            }
        }

        if (arr.length === count || flag === true) {
            alert("Success! Your customer will be notified soon.");
        }
    });

})();

