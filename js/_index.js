// /**
//  * Created by zeusn_000 on 5/21/2016.
//  */
// (function () {
//
//     var all = ["_accSetting", "_contact", "_history", "_passwordRecovery", "_homePage", "_shopping", "_checkout", "_login",
//         "_rating", "_passwordReset", "_signUp", "_tickets", "_driverList2", '_congrats', "_yourDeliveries"];
//
//     var allGlyphs = ["glyphicon glyphicon-cog", "", "", "glyphicon glyphicon-wrench", "glyphicon glyphicon-home",
//         "", "glyphicon glyphicon-check", "glyphicon glyphicon-log-in", "glyphicon glyphicon-signal",
//         "glyphicon glyphicon-repeat",
//         "glyphicon glyphicon-plus-sign", "", "", ""];
//
//     var pageNames = ["Setting", "Contact", "History", "Password Recovery", "Home", "Shopping", "Checkout", "Login",
//         "Rating", "Password Reset", "Sign Up", "Tickets", "Driver List", 'Congrats', "Your Deliveries"];
//
//
//     $(document).ready(function () {
//         var i;
//         var whichid;
//         var glyph;
//         var name;
//         for (var j = 0; j < allSections.length; j++) {
//             var sectionName = allSections[j];
//             var section = allPages[sectionName];
//             for (i = 0; i < section.length; i++) {
//                 whichid = section[i];
//                 for (var k = 0; k < all.length; k++) {
//                     if (whichid == all[k]) {
//                         glyph = allGlyphs[k];
//                         name = pageNames[k];
//                         break;
//                     }
//                 }
//                 var clickVal = "onclick=\"goToPage('" + whichid + "');\"";
//                 $("#Butt").append("<div " + clickVal + " > <span class= '" + glyph + "'></span> " + name + "   </div>");
//             }
//         }
//     });
// })();