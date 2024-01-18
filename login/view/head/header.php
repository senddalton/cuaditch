<?php 
    require_once("login/view/head/head.php");
?>

<div class="fondo_menu">
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <?php if(empty($_SESSION['usuario'])): ?>
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Inicio</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="#">Boton 1</a>
                            <a class="nav-link" href="#">Boton 2</a>
                            <a class="nav-link" href="#">Boton 3</a>
                            <a class="nav-link disabled" aria-disabled="true">Boton</a>
                        </div>
                    </div>
                    <a class="boton" href="/login/view/home/login.php">Inicio de sesion</a>
                    <a class="boton" href="/login/view/home/signup.php">Registrate</a>
                </div>

                <?php else: ?>

                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Inicio</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="#">Boton 1.1</a>
                            <a class="nav-link" href="#">Boton 2</a>
                            <a class="nav-link" href="#">Boton 3</a>
                            <a class="nav-link disabled" aria-disabled="true">Boton</a>
                        </div>
                    </div>
                    <a class="boton" href="/login/view/home/logout.php">Cerrar sesion</a>
                </div>
                <?php endif ?>
        </nav>
    </div>
</div>
<div class="fondo">
