<?php
include '../config/db_config.php';

// Select reviews ordered by created_at descending
$query = "SELECT name, rating, message FROM reviews ORDER BY created_at DESC";
$stmt = mysqli_prepare($conn, $query);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . mysqli_error($conn)]);
    exit;
}

mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$reviews = [];
while ($row = mysqli_fetch_assoc($result)) {
    $reviews[] = [
        'name' => $row['name'],
        'rating' => $row['rating'],
        'message' => $row['message']
    ];
}

echo json_encode($reviews);
mysqli_close($conn);
?>
