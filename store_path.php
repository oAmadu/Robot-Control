<?php
// Get the path data
$path = $_POST["path"];

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "robot_navigation_system";
$conn = new mysqli($servername, $username, $password, $dbname);

// Insert the data into the database
$sql = "INSERT INTO paths (path, timestamp) VALUES ('$path', NOW())";
$conn->query($sql);

// Close the database connection
$conn->close();
?>