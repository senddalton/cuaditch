<?php
    require_once("login/controller/homeController.php");
    session_start();
    $obj = new homeControler();
    $correo = $obj->limpiarCorreo ($_POST['correo']);
    $password = $obj->limpiarCadena ($_POST['password']);
    $bandera = $obj->verificarusuario($correo,$password);
    if ($bandera) {
        $_SESSION['usuario'] = $correo;
        header("Location:panel_control.php");
    }else{
        $error = "<li>Clave incorrecta</li>";
        header("Location:login.php?error=".$error);
    }
?>
