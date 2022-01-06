<?php
    //connect to database
    include_once "config.php";
    $conn=mysqli_connect($host,$adminuser,$adminpass,$dbname);
    if(mysqli_connect_errno()) {
        die("Connection Failed!".mysqli_connect_error());
    } 

    //get id to delete
    $id_to_delete = $_POST['order_id'];
    //build and run query
    $sql="DELETE FROM Orders WHERE order_id='$id_to_delete';";
    $res=mysqli_query($conn,$sql);
    //disconnect from database
    echo "deleted";
    mysqli_close($conn);
?>