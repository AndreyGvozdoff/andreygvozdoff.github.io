$(document).ready(function () {
    $("#quantity").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) return false;
    });
    var parseAPPID = "GxdDZweNLO0HGxCL7iZdNCHb1pfaJmIalIpYvguM";
    var parseJSID = "mXF4KGFFlhUo9K46jvfGwDZvs9GRQxEAWOs5U9UL";
    var count = 1;

    Parse.initialize(parseAPPID, parseJSID);
    var NewBook = Parse.Object.extend("NewBook");

    var query = new Parse.Query(NewBook);
    query.find({
        success: function(results) {
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                $( ".table" ).append( "<tr><td>" + count++ + "</td><td>" + object.get('name') + "</td><td>"+ object.get('author') +"</td><td>"+ object.get('year') +"</td><td><button id='del' class='btn btn-danger' data-value="+ object.id +">Delete</button></td></tr>");
            }
        },
        error: function(e) {
            console.dir(e);
        }
    });

    $(document).on("click", "#del", function () {
        var delObject = $("#del").attr("data-value");
        var queryDelete = new Parse.Query(NewBook);
        queryDelete.get(delObject, {
            success: function (delObj) {
                delObj.destroy({
                    success:function() {
                        location.reload(true);
                    },
                    error: function (object, error) {
                        console.log("Error: " + error.code + " " + error.message);
                    }
                });
            },
            error: function (object, error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    });

    $(".form-horizontal").on("submit", function(e) {
        e.preventDefault();
        var data = {};
        data.name = $("#name").val();
        data.author = $("#author").val();
        data.year = $("#quantity").val();

        var newBook = new NewBook();
        newBook.save(data, {
            success:function(newBook) {
                var id = newBook.id;
                var year = newBook.get("year");
                var author = newBook.get("author");
                var name = newBook.get("name");
                $( ".table" ).append( "<tr><td>"+ count++ +"</td><td>" + name + "</td><td>"+ author +"</td><td>"+ year +"</td><td><button id='del' class='btn btn-danger' data-value="+ id +">Delete</button></td></tr>");
            },
            error:function(e) {
                console.dir(e);
            }
        });
    });
});
