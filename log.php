// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "robot_navigation_system";
$conn = new mysqli($servername, $username, $password, $dbname);

// Retrieve the command log from the database
$sql = "SELECT * FROM commands ORDER BY timestamp DESC";
$result = $conn->query($sql);

// Display the command log in a table
echo "<table>";
echo "<tr><th>ID</th><th>Command</th><th>Timestamp</th></tr>";
while ($row = $result->fetch_assoc()) {
  echo "<tr><td>" . $row["id"] . "</td><td>" . $row["command"] . "</td><td>" . $row["timestamp"] . "</td></tr>";
}
echo "</table>";

// Close the database connection
$conn->close();