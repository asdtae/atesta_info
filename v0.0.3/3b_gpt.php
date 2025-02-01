<?php

    $conn = mysqli_connect("localhost","root","","12b19a");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $class_id = isset($_POST['class_id']) ? intval($_POST['class_id']) : 0;

    if ($class_id > 0) {
        // 3. Diákok lekérdezése az adott osztályhoz
        $query = $conn->prepare("
            SELECT test.nev 
            FROM test
            WHERE test.osztaly = ?
        ");
        $query->bind_param("i", $class_id);
        $query->execute();
        $result = $query->get_result();

        // 4. Eredmények visszaküldése JSON formában
        $students = [];
        while ($row = $result->fetch_assoc()) {
            $students[] = $row['name'];
        }

        header('Content-Type: application/json');
        echo json_encode($students);
    } else {
        echo json_encode(["error" => "Invalid class ID"]);
    }

$conn->close();

