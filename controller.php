<?php // Get the command from the POST request
$command = $_POST["command"];

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "robot_navigation_system";
$conn = new mysqli($servername, $username, $password, $dbname);

// Insert the command and timestamp into the database
$sql = "INSERT INTO commands (command, timestamp) VALUES ('$command', NOW())";
$conn->query($sql);

// Close the database connection
$conn->close();
?>