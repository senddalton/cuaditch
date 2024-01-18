<?php 
    require_once("login/view/head/head.php");
    if(!empty($_SESSION['usuario'])) {
        header("Location:panel_control.php");
    }
?>

<div class="fondo-login">
    <div class="icon">
        <a href="/login/index.php">
            <i class="fa-solid fa-shield-dog dog-icon"></i>
        </a>
    </div>
    <div class="titulo">
        Inicia sesion
    </div>

    <form class="col-3 login" action="verificar.php" method="POST">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" name="correo" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <div class="box-eye">
                <button type="button" onclick="showPassword('password','eyepassword')">
                    <i id="eyepassword" class="fa-solid fa-eye changePassword"></i>
                </button>
            </div>
            <input type="password" name="password" class="form-control" id="password">
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>

        <?php if(!empty($_GET['error'])): ?>
            <div id="alertError" style="margin: auto; " class="alert alert-danger mb-2" role="alert">
            <?= !empty($_GET['error']) ? $_GET['error'] : "" ?>
            </div>
            <?php endif; ?>

        <div class="d-gird gap-2">
            <button type="submit" class="btn btn-primary">Login</button>
        </div>
    </form>
    <div class="col-3 login mt-3">Eres Nuevo? 
        <a href="signup.php" style="text-decoration: none;">Crea una cuenta</a>
    </div>

</div>

<?php 
    require_once("login/view/head/footer.php"); 
?>
