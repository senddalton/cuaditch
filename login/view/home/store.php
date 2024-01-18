<?php
    require_once("login/controller/homeController.php");
    $obj = new homeControler();
    $correo = $_POST['correo'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];
    $error = "";
    if(empty($correo) || empty($password) || empty($confirmPassword)) {
        $error .= "<li> Completa los campos </li>";
        header("Location:signup.php?error=".$error."&&correo=".$correo."&&password=".$password."&&confirmPassword=".$confirmPassword);
    }else if($correo && $password && $confirmPassword){
        if($password == $confirmPassword){
            if($obj->guardarUsuario($correo, $password) == false){
                $error .= "<li> El correo ya se ha registrado </li>";
                header("Location:signup.php?error=".$error."&&correo=".$correo."&&password=".$password."&&confirmPassword=".$confirmPassword);
            }else{
                header("Location:login.php");
            }
        }else{
            $error .= "<li> Las contraseñas no coinciden </li>";
            header("Location:signup.php?error=".$error."&&correo=".$correo."&&password=".$password."&&confirmPassword=".$confirmPassword);
        }
    }
?>
