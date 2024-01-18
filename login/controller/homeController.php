<?php 
    class homeControler{
        private $MODEL;
        public function __construct(){
            require_once("c://xampp/htdocs/login/model/homeModel.php");
            $this->MODEL = new homeModel();
        }
        public function guardarUsuario($correo,$password){
            $valor = $this->MODEL->agregaNuevoUsuario($this->limpiarCorreo($correo),$this->encriptarPassword($this->limpiarCadena($password)));
            return $valor;
        }

        public function limpiarCadena($campo){
            $campo = strip_tags($campo);
            $campo = filter_var($campo, FILTER_UNSAFE_RAW);
            $campo = htmlspecialchars($campo);
            return $campo;
        }

        public function limpiarCorreo($campo){
            $campo = strip_tags($campo);
            $campo = filter_var($campo, FILTER_SANITIZE_EMAIL);
            $campo = htmlspecialchars($campo);
            return $campo;
        }

        public function encriptarPassword($password){
            return password_hash($password, PASSWORD_DEFAULT);
        }

        public function verificarusuario($correo,$password){
            $keydb = $this->MODEL->obtenerclave($correo);
            return (password_verify($password, $keydb)) ? true : false;
        }
    }
?>