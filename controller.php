<?php 
// Get the command 
$command = $_POST["command"];

// Connect to the db
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "robot_navigation_system";
$conn = new mysqli($servername, $username, $password, $dbname);

// Insert the data into the db
$sql = "INSERT INTO commands (command, timestamp) VALUES ('$command', NOW())";
$conn->query($sql);

// Close the database connection
$conn->close();
?>