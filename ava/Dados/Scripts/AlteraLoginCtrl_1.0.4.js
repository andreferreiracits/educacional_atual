app.controller('AlteraLoginCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', "$http", '$log', 'loginAtual', function ($scope, $timeout, $rootScope, $modalInstance, $http, $log, loginAtual) {
    $scope.global = $rootScope;

    // 0 - Usuario pode alterar login e senha
    // 1 - Usuario pode alterar apenas o login
    // 2 - Usuario pode alterar apenas a senha

    if ($rootScope.alteralogin == true && $rootScope.alteraSenha == true) {
        $scope.configEscola = 0;
    }
    else if ($rootScope.alteralogin == true && $rootScope.alteraSenha == false) {
        $scope.configEscola = 1;
    }
    else {
        $scope.configEscola = 2;
    }

    $scope.alterouSenha = false;

    $scope.usuario = { login: "", pass: "" };
    $scope.passConfirma = "";
    $scope.msgValidacaoLogin = "";
    $scope.confirmacao = "";

    $scope.showErroLogin = false;
    $scope.showLoader = false;
    $scope.showErroConfirmaSenha = false;
    $scope.showErroConfirmacao = false;
    $scope.showErroConfirmacaoSenhaVazia = false;
    $showErroSenha = false;
    $msgValidacaoSenha = "";
    $showLoaderSenha = false;

    var $nonScrollable = $("body");
    $("html").css('overflow', 'hidden');
    $nonScrollable.disablescroll();

    setTimeout(function () {
        $("#Text1").focus();
    }, 1000);

    $scope.verificaLogin = function () {
        if ($scope.usuario.login.trim() != "") {
            $scope.showLoader = true;
            if ($scope.usuario.login.toLowerCase() == loginAtual.login.toLowerCase()) {
                $scope.showErroLogin = true;
                $scope.msgValidacaoLogin = "O login informado é igual ao atual. Informe um login diferente para fazer a alteração.";
                $scope.showLoader = false;
            } else
                if (validaLogin($scope.usuario.login) && ($scope.usuario.login.length > 5 && $scope.usuario.login.length < 21)) {
                    $http.post("/ava/dados/home/verificaLoginExistente", { strLogin: $scope.usuario.login })
                        .then(function (result) {
                            $scope.showErroLogin = false;
                            if (result.data) {
                                $scope.msgValidacaoLogin = "Login já existente. Tente outra opção.";
                                $scope.showErroLogin = result.data
                                $scope.showLoader = false;
                                return;
                            }
                            if ($scope.alteralogin && $scope.usuario.login.trim() != "") {
                                if ($scope.usuario.login.trim().toLowerCase() == "master" + $rootScope.idEscola) {
                                    $scope.msgValidacaoLogin = "Login inválida. Tente outra opção.";
                                    $scope.showErroLogin = true;
                                    $scope.showLoader = false;
                                    return;
                                }
                            }
                            $scope.showLoader = false;
                        },
                        function (erro) {
                            $log.error(erro);
                            $scope.showLoader = false;
                        });
                } else {
                    $scope.showErroLogin = true;
                    $scope.msgValidacaoLogin = "O login digitado é inválido. É preciso que ele tenha entre 6 e 20 caracteres e não pode ser composto por espaços, acentos ou caracteres especiais."
                    $scope.showLoader = false;
                }
        } else {
            $scope.msgValidacaoLogin = "";
            $scope.showErroLogin = false;
        }
    }

    // Não utilizada
    // input - Nova Senha - ng-blur="verificaSenha()"
    $scope.verificaSenha = function () {
        var igualLoginAtual = angular.equals($scope.usuario.pass.toLowerCase(), loginAtual.login.toLowerCase());
        var igualSenhaAnterior = angular.equals($scope.usuario.pass.toLowerCase(), loginAtual.senha.toLowerCase());

        if ($scope.usuario.pass.trim() != "") {
            if (igualLoginAtual) {
                $scope.msgValidacaoSenha = "A senha deve ser diferente do login.";
                $scope.showErroSenha = true;
            } else if (igualSenhaAnterior) {
                $scope.msgValidacaoSenha = "A nova senha deve ser diferente da atual.";
                $scope.showErroSenha = true;
            } else {
                if ($scope.usuario.pass.length > 0 && !validaSenha($scope.usuario.pass)) {
                    $scope.msgValidacaoSenha = "A senha digitada é inválida. É preciso que ela tenha entre 6 e 20 caracteres e não pode ser composta por espaços, acentos ou caracteres especiais.";
                    $scope.showErroSenha = true;
                } else {
                    $scope.msgValidacaoSenha = "";
                    $scope.showErroSenha = false;
                }
            }
        } else {
            $scope.msgValidacaoSenha = "";
            $scope.showErroSenha = false;
        }
    };

    // Não utilizada
    // input - Nova Senha Confirmação - ng-blur="verificaSenhaConfimacao()"
    $scope.verificaSenhaConfimacao = function () {
        var igual = angular.equals($scope.usuario.pass.toLowerCase(), $scope.passConfirma.toLowerCase())
        $scope.showErroConfirmaSenha = !igual;
    };

    function validaLogin(strLogin) {
        if ($("#Text1").val().indexOf(" ") > -1) { return false; }

        //valida inicio com . e acento e caracter especial.
        var val = /^([\w-]+(?:\.[\w-]+)*)$/g;
        // var comhifem = /^(([^-_.]+)\w+([^-_.]+))$/g;
        var comhifem = /^(?:[A-Za-z0-9])+(?:[A-Za-z0-9-_\.])+(?:[A-Za-z0-9])$/g;
        if (val.test(strLogin) && comhifem.test(strLogin) && strLogin.length > 5)
            return true;
        else
            return false;
    };

    function validaSenha(strSenha) {
        var val = /^([a-zA-Z0-9]*){6,20}$/g;

        return val.test(strSenha) && $scope.usuario.pass.length > 5;
    }

    function validaSenhaRegrasEmail() {
        var igualLoginAtual = (loginAtual.login.toLowerCase().indexOf($scope.usuario.pass.toLowerCase()) !== -1);
        var igualSenhaAnterior = angular.equals($scope.usuario.pass.toLowerCase(), loginAtual.senha.toLowerCase());
        var retorno = true;
        if ($scope.usuario.pass.trim() != "") {
            if (igualLoginAtual) {
                $scope.msgValidacaoSenha = "A senha não deve conter seu login.";
                $scope.showErroSenha = true;
                retorno = false;
            } 
        } else {
            $scope.msgValidacaoSenha = "";
            $scope.showErroSenha = false;
        }
        return retorno;
    }

    $scope.validaSenhaBlur = function (strSenha) {
        if (strSenha === "") {
            $scope.showErroSenha = false;
        }
    }

    $scope.validaNovaSenhaBlur = function (strSenha) {
        if (strSenha === "") {
            $scope.showErroConfirmaSenha = false;
        }
    }

    $scope.avancar = function () {
        $scope.showLoader = true;
        if ($scope.usuario.login.toLowerCase() == loginAtual.login.toLowerCase()) {
            $scope.showErroLogin = true;
            $scope.msgValidacaoLogin = "O login informado é igual ao atual. Informe um login diferente para fazer a alteração.";
            $scope.showLoader = false;
            return;
        }

        $http.post("/ava/dados/home/verificaLoginExistente", { strLogin: $scope.usuario.login })
        .then(function (result) {
            $scope.showErroLogin = false;
            $scope.showLoader = false;
            if ($scope.alteralogin && $scope.usuario.login.trim() != "") {
                if (result.data) {
                    $scope.msgValidacaoLogin = "Login já existente. Tente outra opção.";
                    $scope.showErroLogin = result.data;
                    return;
                }
            }
            if ($scope.alteralogin && $scope.usuario.login.trim() != "") {
                if ($scope.usuario.login.trim() == "master" + $rootScope.idEscola) {
                    $scope.msgValidacaoLogin = "Login já existente. Tente outra opção.";
                    $scope.showErroLogin = true;
                    return;
                }
            }

            if (!validaSenhaRegrasEmail()) {
                return;
            }

            // 0 - Usuario pode alterar login e senha
            // 1 - Usuario pode alterar apenas o login
            // 2 - Usuario pode alterar apenas a senha
            if ($scope.configEscola == 1) {
                var igualLogin = angular.equals($scope.usuario.pass.toLowerCase(), $scope.usuario.login.toLowerCase());
                var igualLoginAtual = angular.equals($scope.usuario.pass.toLowerCase(), loginAtual.login.toLowerCase());
                if ($scope.usuario.login.trim() == "" && $scope.usuario.pass.trim() == "") {
                    alert("É necessário informar novo login e/ou senha.");
                    return;
                }
                else {
                    $scope.show1 = false;
                    $scope.show2 = true;
                }
            }
            else if ($scope.configEscola == 2) {
                $scope.showErroSenha = false;
                $scope.showErroConfirmaSenha = false;
                var igual = angular.equals($scope.usuario.pass.toLowerCase(), $scope.passConfirma.toLowerCase())
                var igualSenhaAnterior = angular.equals($scope.usuario.pass.toLowerCase(), loginAtual.senha.toLowerCase());
                var igualLoginAtual = angular.equals($scope.usuario.pass.toLowerCase(), loginAtual.login.toLowerCase());

                var igualLogin = angular.equals($scope.usuario.pass.toLowerCase(), $scope.usuario.login.toLowerCase());
                if (!igualSenhaAnterior) {
                    if (!igualLogin) {
                        //$scope.showErroConfirmaSenha = !igual;
                        if ($scope.usuario.pass.length > 0 && !validaSenha($scope.usuario.pass)) {
                            $scope.msgValidacaoSenha = "A senha digitada é inválida. É preciso que ela tenha entre 6 e 20 caracteres e não pode ser composta por espaços, acentos ou caracteres especiais.";
                            $scope.showErroSenha = true;
                        } else if (!$scope.showErroLogin && igual) {
                            $scope.show1 = false;
                            $scope.show2 = true;
                        }
                    } else {
                        $scope.msgValidacaoSenha = "A senha deve ser diferente do login.";
                        $scope.showErroSenha = true;
                    }
                } else {
                    $scope.msgValidacaoSenha = "A nova senha deve ser diferente da atual.";
                    $scope.showErroSenha = true;
                }

                if (!igualSenhaAnterior && !igualLogin && !$scope.showErroSenha)
                    $scope.showErroConfirmaSenha = !igual;
            }
            else {
                $scope.showErroSenha = false;
                $scope.showErroConfirmaSenha = false;
                var igual = angular.equals($scope.usuario.pass.toLowerCase(), $scope.passConfirma.toLowerCase())
                var igualLogin = angular.equals($scope.usuario.pass.toLowerCase(), $scope.usuario.login.toLowerCase());
                var igualLoginAtual = angular.equals($scope.usuario.pass.toLowerCase(), loginAtual.login.toLowerCase());
                var igualSenhaAnterior = angular.equals($scope.usuario.pass.toLowerCase(), loginAtual.senha.toLowerCase());
                if ($scope.usuario.login.trim() == "" && $scope.usuario.pass.trim() == "") {
                    alert("É necessário informar novo login e/ou senha.");
                    return
                }
                if (!igualSenhaAnterior) {
                    if (!igualLogin) {
                        //$scope.showErroConfirmaSenha = !igual;
                        if ($scope.usuario.pass.length > 0 && !validaSenha($scope.usuario.pass)) {
                            $scope.msgValidacaoSenha = "A senha digitada é inválida. É preciso que ela tenha entre 6 e 20 caracteres e não pode ser composta por espaços, acentos ou caracteres especiais.";
                            $scope.showErroSenha = true;
                        } else if (!$scope.showErroLogin && igual) {
                            $scope.show1 = false;
                            $scope.show2 = true;
                        }
                    } else {
                        $scope.msgValidacaoSenha = "A senha deve ser diferente do login.";
                        $scope.showErroSenha = true;
                    }
                } else {
                    $scope.msgValidacaoSenha = "A nova senha deve ser diferente da atual.";
                    $scope.showErroSenha = true;
                }

                if (!igualSenhaAnterior && !igualLogin && !$scope.showErroSenha)
                    $scope.showErroConfirmaSenha = !igual;
            }


        },
        function (erro) {
            $log.error(erro);
            $scope.showLoader = false;
        });
    };

    $scope.salvar = function () {
        if ($scope.confirmacao.trim() != "") {
            if (angular.equals($scope.confirmacao.toLowerCase(), loginAtual.senha.toLowerCase())) {
                // $scope.configEscola
                // 0 - Usuario pode alterar login e senha
                // 1 - Usuario pode alterar apenas o login
                // 2 - Usuario pode alterar apenas a senha

                var login = "";
                var senha = "";

                if ($scope.configEscola == 1) {
                    login = ($scope.usuario.login.trim() == '' ? loginAtual.login : $scope.usuario.login);
                    senha = loginAtual.senha;
                }
                else if ($scope.configEscola == 2) {
                    login = loginAtual.login;
                    senha = ($scope.usuario.pass.trim() == '' ? loginAtual.senha : $scope.usuario.pass);
                    $scope.alterouSenha = true;
                }
                else {
                    login = ($scope.usuario.login.trim() == '' ? loginAtual.login : $scope.usuario.login);
                    senha = ($scope.usuario.pass.trim() == '' ? loginAtual.senha : $scope.usuario.pass);
                    $scope.alterouSenha = true;
                }

                $http.post("/ava/dados/home/salvarDadosLogin", { strLogin: login, strSenha: senha })
                    .then(function (result) {
                        $log.info(result.data);

                        $scope.show1 = false;
                        $scope.show2 = false;

                        if ($scope.global.dadosUsuario.webmail != "" && $scope.alterouSenha === true) {

                            $scope.show4 = false;

                            if ($scope.configEscola != 1) {
                                $http.post("/icewarp/alteraSenha_email_sync_json.asp")
                                .then(function (result) {
                                    if (result.data.senha_sync === 1) {
                                        $scope.show3 = true;
                                        $scope.show4 = false;
                                    }
                                    else {
                                        $scope.show3 = true;
                                        $scope.show4 = true;
                                    }
                                },
                                function (erro) {
                                    $scope.show3 = true;
                                    $scope.show4 = true;
                                });
                            }
                        }
                        else {
                            $scope.show3 = true;
                            $scope.show4 = false;
                        }
                    },
                    function (erro) {
                        $log.error(erro);
                    });
            } else {
                $scope.showErroConfirmacao = true;
                $scope.showErroConfirmacaoSenhaVazia = false;
            }
        } else {
            $scope.showErroConfirmacaoSenhaVazia = true;
            $scope.showErroConfirmacao = false;
        }
    }

    $scope.ok = function () {
        $modalInstance.dismiss('cancel');
        logoutAVADados();
    }

    $scope.cancela = function () {
        $modalInstance.dismiss('cancel');
    };
} ]);