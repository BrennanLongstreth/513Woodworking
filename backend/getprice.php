<?php
//set up database connection
    include_once 'config.php';  
    $conn=mysqli_connect($host,$dbuser,$pass,$dbname);
    if(mysqli_connect_errno()) {
        die("Connection Failed!".mysqli_connect_error());
    } 
    
    if(isset($_GET['key'])) {
        $IDkey=$_GET['key']; //product name
        $productName = trim(ucwords(preg_replace('/(?<! )[A-Z]/', ' $0',$IDkey)));
    }

    //echo "-$productName-";
    $sql="SELECT DISTINCT product_price FROM Products WHERE product_name = '$productName';";
    $res=mysqli_query($conn,$sql);
    if(!$res) {
        die("Query Failed!");
    }

    $productPrice = $res->fetch_assoc()['product_price'];
    
    
    
    $addon_arr = explode(",", $_GET['addons']);
    $total_addon_price = 0;
    foreach ($addon_arr as &$addon) {
        $addon_int = intval($addon);
        $sql="SELECT addon_price FROM Addons WHERE addon_id = $addon_int;";
        $res=mysqli_query($conn,$sql);
        if(!$res) {
            die("Query Failed!");
        }
        $price=$res->fetch_assoc()['addon_price'];
        
        $total_addon_price = $total_addon_price + $price;
    }
    

    echo $total_addon_price + $productPrice;
    //mysql_close($conn);
?>