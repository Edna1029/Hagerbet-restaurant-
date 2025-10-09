<?php
// add_review.php
// This saves new reviews to the DB.

include '../config/db_config.php'; // Include the MySQL connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = $_POST['name'] ?? '';
    $rating = intval($_POST['rating'] ?? 0);
    $message = $_POST['message'] ?? '';

    // Validation
    if (empty($name) || empty($message) || $rating < 1 || $rating > 5) {
        echo json_encode(['success' => false, 'message' => 'Invalid input.']);
        exit;
    }

    // Insert into DB using prepared statement
    $query = "INSERT INTO reviews (name, rating, message) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "sis", $name, $rating, $message);

    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(['success' => true, 'message' => 'Review submitted successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to submit review.']);
    }

    mysqli_close($conn);

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
}
?>
