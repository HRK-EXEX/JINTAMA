<?php
session_start(); // Start the session

unset($_SESSION['User']); // Unset any existing session data
session_regenerate_id(true); // Regenerate the session ID for security

require '/../php/db.php';

try {
    // Prepare and execute the SQL statement to fetch account details
    $sql = $pdo->prepare('SELECT * FROM User WHERE user_id = ?');
    $sql->execute([$_POST['user_id']]);

    // Loop through the results
    foreach ($sql as $row) {
        // Verify the password
        if (password_verify($_POST['password'], $row['password'])) {
            // Set the session variables (excluding the password)
            $_SESSION['User'] = [
                'user_id' => $row['user_id'],
                'user_name' => $row['user_name'],
                // No need to store the password hash in the session
            ];
        }
    }

    // Check if the account session is set
    if (isset($_SESSION['User'])) {
        // Redirect based on user authority
        if ($_SESSION['User']['user_name'] == 'kanri' && $_POST['password'] == '1234') {
            header('Location:/src/html/G-4/G4-1.html');
            echo '最強！';
        } else {
            header('Location:/src/html/G-2/G2-1_mainmenu.html');
        }
        exit();
    } else {
        // Redirect to the login page with an error message
        header('Location:login-input.php?hogeA=※ログイン名またはパスワードが違います');
        exit();
    }
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>
