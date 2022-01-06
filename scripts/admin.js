window.onload = function() {
    //var jsonObjectpersistant;
    $.get('../backend/currentOrders.php', function(data) {
        //get data from server
        console.log(":" + data);
        jsonObject = JSON.parse(data);
        //jsonObjectpersistant = jsonObject
        keys = Object.keys(jsonObject[0]);
        
        //attempt to create table
        tableStr = "";
        optionStr = "";
        tableStr = tableStr.concat("<table border==\"1\"><tr>");
        keys.forEach(element => {
            tableStr = tableStr.concat('<th>' + element + '</th>');
        });
        tableStr = tableStr.concat("</tr>");
        //loop through rows
        for (var i = 0; i < jsonObject.length; i++) {
            tableStr = tableStr.concat('<tr>');
            //get id
            optionStr = optionStr.concat("<option>"+ jsonObject[i]['order_id'] + "</option>")
            //loop through columns
            for (key in jsonObject[i]) {
                tableStr = tableStr.concat('<td>' + jsonObject[i][key] + '</td>');   
            }
            tableStr = tableStr.concat('</tr>');
        }
        tableStr = tableStr.concat("</table>");
        $(".ordersTable").html(tableStr);
        //finished creating table

        //build options for select
        $("#deleteDD").html(optionStr);

        $.get("../backend/getRevinue.php", function (data) {
            console.log(data);
            $(".totalRevinue").html("Total revinue: " + data);
            
        });
    });
    
    $("#delete").click (function() {
        id = $("#deleteDD").find(":selected").text();
        if(confirm("Delete order: " + id)) {
            
            //ajax post
            $.post("../backend/delete.php",{'order_id':id}, function(data) {
                alert(data);
                //alert("YOUR DATABASE IS GONE! *POOF*");
                //alert("just kidding we deleted order #"+id);
                location.reload();
            })
            
        }
        
    });
}

