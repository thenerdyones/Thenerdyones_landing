<?php
$servername = "127.0.0.1:3306";
$username = "u991654658_TheNerdyOnes";
$password = "1STstart";
$dbname = "u991654658_Form_Data";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO form_enter (name, email, phone, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $phone, $message);

// Set parameters and execute
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$stmt->execute();

if ($stmt->execute()) {
  echo "<script>
          document.getElementById('successMessage').classList.remove('hidden');
          document.getElementById('submissionModal').classList.add('hidden');
          setTimeout(function() {
              window.location.href = '/index.html';
          }, 3000); // Redirect after 3 seconds
        </script>";
} else {
  echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>

?>
