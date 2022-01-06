<?php
//set up database connection
    include_once 'config.php';  
    $conn=mysqli_connect($host,$dbuser,$pass,$dbname);
    if(mysqli_connect_errno()) {
        die("Connection Failed!".mysqli_connect_error());
    } 
//gather all data (commented data is for when i have updated the database schema)
    $order_name = $_POST['name'];
    $order_address = $_POST['address'];
    $order_date = date("Y-m-d");
    $order_delivery_date = date("Y-m-d", strtotime('+1 Week'));
    $order_product_name = $_POST['product'];
    $order_status = 0;
    $order_price = $_POST['price'];
    $order_quantity = $_POST['quantity'];
    //$order_addons = $_POST['addons']; //needs formatting



    //get product ID
    $productName = trim(ucwords(preg_replace('/(?<! )[A-Z]/', ' $0',$order_product_name)));
    $sql = "SELECT product_id FROM Products WHERE product_name = '$productName';";
    // $stmt= mysqli_prepare($conn, 'SELECT product_id FROM Products WHERE product_name = ?;');
    // mysqli_stmt_bind_param($stmt,'s',$productName);
    // mysqli_stmt_execute($stmt);
    // mysqli_stmt_bind_result($stmt,$col1);
    $res=mysqli_query($conn,$sql);
    if(!$res) {
       die("Could not find product!");
    }else {
        $order_product = mysqli_fetch_array($res)['product_id'];
    }
    //die($order_product);
    // if(mysqli_stmt_fetch($stmt)) {
    //     $order_product = intval($col1);
    //     //echo $col1;
    // }
    //echo $order_product;
    
    //input validation for phone and email
    $sql2="";
    if(isset($_POST['email'])) {
        $order_email = $_POST['email'];
        $order_phone = NULL;
        if(isset($_POST['instructions']) && $_POST['instructions'] != '') {
            $order_instructions = $_POST['instructions'];
            $sql2="INSERT INTO Orders VALUES (NULL, '$order_name', '$order_address', '$order_email', NULL, '$order_date', '$order_delivery_date', $order_product, $order_status, $order_price, '$order_instructions');";
        }else {
            $order_instructions = NULL;
            $sql2="INSERT INTO Orders VALUES (NULL, '$order_name', '$order_address', '$order_email', NULL, '$order_date', '$order_delivery_date', $order_product, $order_status, $order_price, NULL);";
        }
    }else if(isset($_POST['phone'])) {
        $order_phone = $_POST['phone'];
        $order_email = NULL;
        if(isset($_POST['instructions']) && $_POST['instructions'] != '') {
            $order_instructions = $_POST['instructions'];
            $sql2="INSERT INTO Orders VALUES (NULL, '$order_name', '$order_address', NULL, '$order_phone', '$order_date', '$order_delivery_date', $order_product, $order_status, $order_price, '$order_instructions');";
        }else {
            $order_instructions = NULL;
            $sql2="INSERT INTO Orders VALUES (NULL, '$order_name', '$order_address', NULL, '$order_phone', '$order_date', '$order_delivery_date', $order_product, $order_status, $order_price, NULL);";
        }
    }else {
        die("Something went wrong");
    }

    

//run query for orders table
    for($i = 0; $i < $order_quantity; $i++) {
        //default query
        $res=mysqli_query($conn,$sql2);
        if(!$res) {
            die("Query Failed!");
        }

        //addons
        if(isset($_POST['addons']) && $_POST['addons'] != "") {
        
            $order_addons = explode(",", $_POST['addons']);
            $id = intval(mysqli_insert_id($conn));
            //die("". $id);
            for($j = 0; $j < count($order_addons); $j++) {
                $addon_id = intval($order_addons[$j]);
                //echo $id . " " . $addon_id;
                $query = "INSERT INTO Order_Addon VALUES ($id,$addon_id);";
                $result=mysqli_query($conn, $query);
            }
            
        }
    }
//build and run query for addons
    

    echo "Your order has been processed,\nYou will recieve a confirmation email/text shortly. \n(This window will show up for each item in your cart)";
    mysqli_close($conn);
?>