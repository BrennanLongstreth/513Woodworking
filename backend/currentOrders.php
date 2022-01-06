<?php
    // login
    // this one is supposed to run as admin but i couldnt get that to work
    // connect to database
    include_once 'config.php';
    $conn=mysqli_connect($host,$adminuser,$adminpass,$dbname);
    if(mysqli_connect_errno()) {
        die("Connection Failed!".mysqli_connect_error());
    } 

    // query
    $sql="SELECT order_id, order_name, order_address, order_email, order_phone, order_date, order_delivery_date, p.product_name, so.status_text, order_price, order_instructions
          FROM Orders o JOIN Status_Options so ON (o.order_status = so.status_id)
                        JOIN Products p ON (o.order_product_id = p.product_id)
          ORDER BY order_status, order_delivery_date DESC;";
    $res=mysqli_query($conn,$sql);
    if(!$res) {
        die("Query Failed!");
    }
    // show
    $table = array();
    while($row = mysqli_fetch_array($res)) {
        $currentOrders = array();
        foreach ($row as $key => $val) {
            if(!is_numeric($key))
                $currentOrders[$key] = $val;
        }
        //get addons
        $id = intval($currentOrders['order_id']);
        $sql2="SELECT addon_name
              FROM Order_Addon oa JOIN Addons a ON (oa.addon_id = a.addon_id)
              WHERE order_id = $id;";
        $result=mysqli_query($conn,$sql2);
        $addons = "";
        if($result->num_rows > 0) {
            //get addon list
            while($row = $result->fetch_assoc()) {
               $addons = "$addons, " . $row['addon_name'];
               //echo $row['addon_name'];
            }
            $currentOrders['addons'] = $addons;
        
        }else {
            //echo "query failed";
            $currentOrders['addons'] = "";
        }
        
        $table[] = $currentOrders;
    }



    echo json_encode($table);
    mysqli_close($conn);
?>

        