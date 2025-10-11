<?php
header('Content-Type: application/json');

$dataFile = 'data.json';

// Handle GET requests to fetch data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Data file not found.']);
    }
}

// Handle POST requests to update data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (json_last_error() === JSON_ERROR_NONE) {
        // Read existing data
        $data = json_decode(file_get_contents($dataFile), true);

        // Update data with new values
        foreach ($input as $key => $value) {
            if (array_key_exists($key, $data)) {
                $data[$key] = $value;
            }
        }

        // Save the updated data
        if (file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT))) {
            echo json_encode(['success' => true, 'message' => 'Data updated successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to write to data file.']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON input.']);
    }
}
?>
