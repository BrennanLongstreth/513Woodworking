<?php
//connect to database
    include_once 'config.php';
    $conn=mysqli_connect($host,$dbuser,$pass,$dbname);
    if(mysqli_connect_errno()) {
        die("Connection Failed!".mysqli_connect_error());
    } 
//get value from input
    if(isset($_GET['key'])) {
        $IDkey=$_GET['key']; //product name
        $productName = trim(ucwords(preg_replace('/(?<! )[A-Z]/', ' $0',$IDkey)));
    }
    else {
        die("Pass failed!");
    }
    echo $IDkey . "@";
//run query
    //TODO: Adjust query to only get the addons for the correct item
    $sql="SELECT DISTINCT addon_id, addon_name, addon_price 
         FROM Addons
         WHERE addon_id = ANY (SELECT addon_id
                               FROM Product_Addon pa JOIN Products p ON (pa.product_id = p.product_id)
                               WHERE p.product_name = '$productName');";
    
    $res=mysqli_query($conn,$sql);
    if(!$res) {
        die("Query Failed!");
    }
    //echo $productName;
//return results
    //build json object
    $list = array();
    while($row = mysqli_fetch_array($res)) {
        $addon = array();
        foreach ($row as $key => $val) {
            if(!is_numeric($key))
                $addon[$key] = $val;
            //echo "-!";
        }
        $list[] = $addon;
    }
    echo json_encode($list);

//return sql object 
/*    printf("<select id='addonsDD_%s' class='addonsDD'>",$IDkey);
    
    while($row = mysqli_fetch_array($res)) {
        //returns the addon id as the value and the addon name as the text
        printf("<option value='%s'>%s (+%s)</option>", $row['addon_id'], $row['addon_name'], $row['addon_price']);
    }
    printf("</select>"); */
    mysqli_close($conn);
?>

